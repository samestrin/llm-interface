/**
 * @file src/interfaces/mistral.js
 * @class Mistral
 * @description Wrapper class for the Mistral API.
 * @param {string} apiKey - The API key for the Mistral API.
 */

const axios = require('axios');
const { getFromCache, saveToCache } = require('../utils/cache');
const { returnMessageObject, returnModelByAlias } = require('../utils/utils');
const { mistralApiKey } = require('../config/config');
const config = require('../config/llm-providers.json');
const log = require('loglevel');

// Mistral class for interacting with the Mistral API
class Mistral {
  /**
   * Constructor for the Mistral class.
   * @param {string} apiKey - The API key for the Mistral API.
   */
  constructor(apiKey) {
    this.interfaceName = 'mistral';
    this.apiKey = apiKey || mistralApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the Mistral API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the Mistral API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    const messageObject =
      typeof message === 'string' ? returnMessageObject(message) : message;
    let cacheTimeoutSeconds;
    if (typeof interfaceOptions === 'number') {
      cacheTimeoutSeconds = interfaceOptions;
    } else {
      cacheTimeoutSeconds = interfaceOptions.cacheTimeoutSeconds;
    }

    const { max_tokens = 150 } = options;
    let { model, messages } = messageObject;

    // Get the selected model based on alias or default
    model = returnModelByAlias(this.interfaceName, model);

    // Set the model and default values
    model =
      model || options.model || config[this.interfaceName].model.default.name;
    if (options.model) options.model = model;

    // Prepare the payload for the API call
    const payload = {
      model,
      messages,
      max_tokens,
      ...options,
    };

    // Generate a cache key based on the payload
    const cacheKey = JSON.stringify(payload);
    if (cacheTimeoutSeconds) {
      const cachedResponse = getFromCache(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    // Set up retry mechanism with exponential backoff
    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;
    while (retryAttempts >= 0) {
      try {
        // Send the request to the Mistral API
        const response = await this.client.post('', payload);
        let responseContent = null;
        if (
          response &&
          response.data &&
          response.data.choices &&
          response.data.choices[0] &&
          response.data.choices[0].message &&
          response.data.choices[0].message.content
        ) {
          responseContent = response.data.choices[0].message.content;
        }

        if (cacheTimeoutSeconds && responseContent) {
          saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
        }

        return responseContent;
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
          // Log any errors and throw the error
          log.error(
            'Response data:',
            error.response ? error.response.data : null,
          );
          throw error;
        }

        // Calculate the delay for the next retry attempt
        let retryMultiplier = interfaceOptions.retryMultiplier || 0.3;
        const delay = (currentRetry + 1) * retryMultiplier * 1000;

        await new Promise((resolve) => setTimeout(resolve, delay));
        currentRetry++;
      }
    }
  }
}

module.exports = Mistral;
