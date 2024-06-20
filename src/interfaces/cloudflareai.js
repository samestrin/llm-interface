/**
 * @file src/interfaces/cloudflareai.js
 * @class CloudflareAI
 * @description Wrapper class for the CloudflareAI API.
 * @param {string} apiKey - The API key for the CloudflareAI API.
 */

const axios = require('axios');
const { adjustModelAlias } = require('../utils/adjustModelAlias.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const {
  returnSimpleMessageObject,
  returnModelByAlias,
} = require('../utils/utils.js');
const {
  cloudflareaiApiKey,
  cloudflareaiAccountId,
} = require('../config/config.js');
const config = require('../config/llmProviders.json');
const log = require('loglevel');

// CloudflareAI class for interacting with the CloudflareAI LLM API
class CloudflareAI {
  /**
   * Constructor for the CloudflareAI class.
   * @param {string} apiKey - The API key for the CloudflareAI LLM API.
   */
  constructor(apiKey, accountId) {
    this.interfaceName = 'cloudflareai';

    this.apiKey = apiKey || cloudflareaiApiKey;
    this.accountId = accountId || cloudflareaiAccountId;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the CloudflareAI LLM API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the CloudflareAI LLM API.
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

    // Extract model, lora, and messages from the message object
    const { model, lora, messages } = messageObject;

    // Get the selected model based on alias or default
    let selectedModel = returnModelByAlias(this.interfaceName, model);

    // Set default values for temperature, max_tokens, stop_sequences, frequency_penalty, and presence_penalty
    const {
      temperature = 0.7,
      max_tokens = 150,
      stop_sequences = ['<|endoftext|>'],
      frequency_penalty = 0,
      presence_penalty = 0,
    } = options;

    const account_id = interfaceOptions.account_id || this.accountId;

    // Update selected model
    selectedModel =
      selectedModel ||
      options.model ||
      config[this.interfaceName].model.default.name;

    // Prepare the request body for the API call
    const requestBody = {
      messages,
      max_tokens,
      ...options,
    };

    // Append the model name to the cache key
    let cacheKeyFromRequestBody = requestBody;
    cacheKeyFromRequestBody.model = selectedModel;

    // Generate a cache key based on cacheKeyFromRequestBody
    const cacheKey = JSON.stringify(cacheKeyFromRequestBody);

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
        // Send the request to the CloudflareAI LLM API
        const response = await this.client.post(
          `/${account_id}/ai/run/${selectedModel}`,
          requestBody,
        );

        // Extract the response content from the API response
        let responseContent = null;
        if (
          response &&
          response.data &&
          response.data.result &&
          response.data.result.response
        ) {
          responseContent = response.data.result.response;
        }

        // Attempt to repair the object if needed
        if (interfaceOptions.attemptJsonRepair) {
          responseContent = JSON.parse(responseContent);
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
CloudflareAI.prototype.adjustModelAlias = adjustModelAlias;

module.exports = CloudflareAI;
