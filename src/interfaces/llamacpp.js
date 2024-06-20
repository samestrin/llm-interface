/**
 * @file src/interfaces/llamacpp.js
 * @class LlamaCPP
 * @description Wrapper class for the LlamaCPP API.
 * @param {string} llamacppURL - The base URL for the LlamaCPP API.
 */

const axios = require('axios');
const { adjustModelAlias } = require('../utils/adjustModelAlias.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const config = require('../config/llmProviders.json');
const log = require('loglevel');

// LlamaCPP class for interacting with the LlamaCPP API
class LlamaCPP {
  /**
   * Constructor for the LlamaCPP class.
   * @param {string} llamacppURL - The base URL for the LlamaCPP API.
   */
  constructor(llamacppURL) {
    this.interfaceName = 'llamacpp';
    this.client = axios.create({
      baseURL: llamacppURL || config[this.interfaceName].url,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Send a message to the LlamaCPP API.
   * @param {string|object} prompt - The prompt to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the LlamaCPP API.
   */
  async sendMessage(prompt, options = {}, interfaceOptions = {}) {
    // Get the cache timeout value from interfaceOptions
    let cacheTimeoutSeconds;
    if (typeof interfaceOptions === 'number') {
      cacheTimeoutSeconds = interfaceOptions;
    } else {
      cacheTimeoutSeconds = interfaceOptions.cacheTimeoutSeconds;
    }

    // Set default value for max_tokens
    const { max_tokens = 150 } = options;

    // Format the prompt based on the input type
    let formattedPrompt;
    if (typeof prompt === 'string') {
      formattedPrompt = prompt;
    } else {
      // Join message contents to format the prompt
      formattedPrompt = prompt.messages
        .map((message) => message.content)
        .join(' ');
    }

    // Prepare the payload for the API call
    const payload = {
      prompt: formattedPrompt,
      n_predict: max_tokens,
    };

    // Generate a cache key based on the payload
    const cacheKey = JSON.stringify(payload);
    if (cacheTimeoutSeconds) {
      // Check if a cached response exists for the request
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
        // Send the request to the LlamaCPP API
        const response = await this.client.post('', payload);
        // Extract the response content from the API response
        let responseContent = '';
        if (response.data.content) {
          responseContent = response.data.content;
        } else if (response.data.results) {
          // Join the results content if available
          responseContent = response.data.results
            .map((result) => result.content)
            .join();
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
LlamaCPP.prototype.adjustModelAlias = adjustModelAlias;
module.exports = LlamaCPP;
