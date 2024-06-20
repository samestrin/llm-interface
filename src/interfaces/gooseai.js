/**
 * @file src/interfaces/gooseai.js
 * @class GooseAI
 * @description Wrapper class for the GooseAI API.
 * @param {string} apiKey - The API key for the GooseAI API.
 */

const axios = require('axios');
const { adjustModelAlias } = require('../utils/adjustModelAlias.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const {
  returnMessageObject,
  returnModelByAlias,
} = require('../utils/utils.js');
const { gooseaiApiKey } = require('../config/config.js');
const config = require('../config/llmProviders.json');
const log = require('loglevel');

// GooseAI class for interacting with the GooseAI API
class GooseAI {
  /**
   * Constructor for the GooseAI class.
   * @param {string} apiKey - The API key for the GooseAI API.
   */
  constructor(apiKey) {
    this.interfaceName = 'gooseai';
    this.apiKey = apiKey || gooseaiApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the GooseAI API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the GooseAI API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    const messageObject =
      typeof message === 'string' ? returnMessageObject(message) : message;
    const cacheTimeoutSeconds =
      typeof interfaceOptions === 'number'
        ? interfaceOptions
        : interfaceOptions.cacheTimeoutSeconds;

    const { messages } = messageObject;
    const { max_tokens = 150 } = options;
    let { model } = messageObject;

    // Get the selected model based on alias or default
    model = returnModelByAlias(this.interfaceName, model);

    // Set the model and default values
    model =
      model || options.model || config[this.interfaceName].model.default.name;

    // Format the prompt by joining message contents
    const formattedPrompt = messages
      .map((message) => message.content)
      .join(' ');

    // Prepare the payload for the API call
    const payload = {
      prompt: formattedPrompt,
      model,
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
        // Send the request to the GooseAI API
        const url = `/${model}/completions`;
        const response = await this.client.post(url, payload);
        let responseContent = null;
        if (
          response &&
          response.data &&
          response.data.choices &&
          response.data.choices[0] &&
          response.data.choices[0].text
        ) {
          responseContent = response.data.choices[0].text.trim();
        }
        // Attempt to repair the object if needed
        if (interfaceOptions.attemptJsonRepair) {
          responseContent = await parseJSON(
            responseContent,
            interfaceOptions.attemptJsonRepair,
          );
        }
        // Build response object
        responseContent = { results: responseContent };

        if (cacheTimeoutSeconds && responseContent) {
          saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
        }

        return responseContent;
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
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

GooseAI.prototype.adjustModelAlias = adjustModelAlias;

module.exports = GooseAI;
