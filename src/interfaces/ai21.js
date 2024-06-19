/**
 * @file src/interfaces/ai21.js
 * @class AI21
 * @description Wrapper class for the AI21 API.
 * @param {string} apiKey - The API key for the AI21 API.
 */

const axios = require('axios');
const { getFromCache, saveToCache } = require('../utils/cache');
const {
  returnSimpleMessageObject,
  returnModelByAlias,
} = require('../utils/utils');
const { ai21ApiKey } = require('../config/config');
const config = require('../config/llmProviders.json');
const log = require('loglevel');

// AI21 class for interacting with the AI21 API
class AI21 {
  /**
   * Constructor for the AI21 class.
   * @param {string} apiKey - The API key for AI21 API.
   */
  constructor(apiKey) {
    this.interfaceName = 'ai21';
    this.apiKey = apiKey || ai21ApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the AI21 API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the AI21 API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    // Convert a string message to a simple message object
    const messageObject =
      typeof message === 'string'
        ? returnSimpleMessageObject(message)
        : message;
    // Get the cache timeout value from interfaceOptions
    const cacheTimeoutSeconds =
      typeof interfaceOptions === 'number'
        ? interfaceOptions
        : interfaceOptions.cacheTimeoutSeconds;

    // Extract model and messages from the message object
    const { model, messages } = messageObject;
    // Get the selected model based on alias or default
    const selectedModel = returnModelByAlias(this.interfaceName, model);
    // Set default values for temperature, top_p, stop, and max_tokens
    const {
      temperature = 1,
      top_p = 1,
      stop = '<|endoftext|>',
      max_tokens = 150,
    } = options;

    // Prepare the request body for the API call
    const requestBody = {
      model:
        selectedModel ||
        options.model ||
        config[this.interfaceName].model.default.name,
      messages,
      max_tokens,
      ...options,
    };

    // Generate a cache key based on the request body
    const cacheKey = JSON.stringify(requestBody);
    // Check if a cached response exists for the request
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
        // Send the request to the AI21 API
        const response = await this.client.post('', requestBody);
        // Extract the response content from the API response
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

        // Cache the response content if cache timeout is set
        if (cacheTimeoutSeconds && responseContent) {
          saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
        }

        // Return the response content
        return responseContent;
      } catch (error) {
        // Decrease the number of retry attempts
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
        // Wait for the specified delay before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));
        currentRetry++;
      }
    }
  }
}

module.exports = AI21;
