/**
 * @file src/interfaces/telnyx.js
 * @class Telnyx
 * @description Wrapper class for the Telnyx API.
 * @param {string} apiKey - The API key for Telnyx AI.
 */

const axios = require('axios');
const { adjustModelAlias } = require('../utils/adjustModelAlias.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const {
  returnSimpleMessageObject,
  returnModelByAlias,
  parseJSON,
} = require('../utils/utils.js');
const { telnyxApiKey } = require('../config/config.js');
const config = require('../config/llmProviders.json');
const log = require('loglevel');

// Telnyx class for interacting with the Telnyx AI API
class Telnyx {
  /**
   * Constructor for the Telnyx class.
   * @param {string} apiKey - The API key for the Telnyx AI API.
   */
  constructor(apiKey) {
    this.interfaceName = 'telnyx';
    this.apiKey = apiKey || telnyxApiKey;
    this.client = axios.create({
      baseURL: 'https://api.telnyx.com/v2/ai/chat/completions', // Telnyx AI API base URL
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the Telnyx AI API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the Telnyx AI API.
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

    // Set default values for max_tokens and stop
    const {
      max_tokens = 150,
      stop = '<|endoftext|>',
      response_format = '',
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

    // Add response_format if specified
    if (response_format) {
      requestBody.response_format = { type: response_format };
    }

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
        // Send the request to the Telnyx AI API
        const response = await this.client.post('', requestBody);

        // Extract the response content from the API response
        let responseContent = null;
        if (
          response &&
          response.data &&
          response.data.results &&
          response.data.results[0] &&
          response.data.results[0].generated_text
        ) {
          responseContent = response.data.results[0].generated_text;
        }

        // Attempt to repair the object if needed
        if (
          response_format === 'json_object' &&
          interfaceOptions.attemptJsonRepair
        ) {
          responseContent = await parseJSON(
            responseContent,
            interfaceOptions.attemptJsonRepair,
          );
        }

        // Build response object
        responseContent = { results: responseContent };

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

// Adjust model alias for backwards compatibility
Telnyx.prototype.adjustModelAlias = adjustModelAlias;

module.exports = Telnyx;