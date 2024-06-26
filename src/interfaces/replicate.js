/**
 * @file src/interfaces/replicate.js
 * @class Replicate
 * @description Wrapper class for the Replicate API.
 * @param {string} apiKey - The API key for the Replicate API.
 */
const axios = require('axios');
const { delay } = require('../utils/utils.js');
const { adjustModelAlias, getModelByAlias } = require('../utils/config.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const { replicateOpenAIApiKey } = require('../config/config.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();
const log = require('loglevel');

// Replicate class for interacting with the Replicate API
class Replicate {
  /**
   * Constructor for the Replicate class.
   * @param {string} apiKey - The API key for the Replicate API.
   */
  constructor(apiKey) {
    this.interfaceName = 'replicate';
    this.apiKey = apiKey || replicateOpenAIApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the Replicate API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the Replicate API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    // Get the cache timeout value from interfaceOptions
    const cacheTimeoutSeconds =
      typeof interfaceOptions === 'number'
        ? interfaceOptions
        : interfaceOptions.cacheTimeoutSeconds;

    // Extract model and messages from the message object
    let { model } = message;

    // Set the model and default values
    model =
      model || options.model || config[this.interfaceName].model.default.name;
    if (options.model) delete options.model;

    // Get the selected model based on alias or default
    const selectedModel = getModelByAlias(this.interfaceName, model);

    // Set default values for temperature, max_tokens, and stop_sequences
    const { max_tokens = 150 } = options;

    // Format the prompt based on the input type
    let prompt;
    if (typeof message === 'string') {
      prompt = message;
    } else {
      // Join message contents to format the prompt
      prompt = message.messages.map((message) => message.content).join(' ');
    }

    if (options.max_tokens) delete options.max_tokens;
    // Prepare the request body for the API call
    const requestBody = {
      input: {
        prompt,
        max_new_tokens: max_tokens,
        ...options,
      },
    };

    // Generate a cache key based on the request body
    const cacheKey = JSON.stringify({ requestBody, interfaceOptions });

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
        // Send the request to the Replicate API
        const response = await this.client.post(
          `/${selectedModel}/predictions`,
          requestBody,
        );

        // Extract the response content from the API response
        let responseContent = null;
        if (response.data && response.data.urls && response.data.urls.get) {
          responseContent = await this.getPredictionData(
            response.data.urls.get,
            interfaceOptions,
          );
        }

        // Merge results array
        responseContent = responseContent.join('');

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
        const delayTime = (currentRetry + 1) * retryMultiplier * 1000;
        await delay(delayTime);

        currentRetry++;
      }
    }
  }

  /**
   * Get prediction data from a URL.
   * @param {string} url - The URL to fetch the prediction data from.
   * @returns {object} The prediction data.
   */
  async getPredictionData(url, interfaceOptions) {
    let attempt = 0;
    const maxAttempts = 5;
    const baseDelay = 500;

    while (attempt < maxAttempts) {
      try {
        const results = await this.client.get(url);
        const status = results.data.status;

        if (status === 'succeeded') {
          return results.data.output;
        } else if (status === 'failed' || status === 'canceled') {
          return false;
        } else if (status === 'starting' || status === 'processing') {
          // Calculate the progressive delay
          let retryMultiplier = interfaceOptions.retryMultiplier || 0.3;
          const delayTime = (attempt + 1) * retryMultiplier * 1000;
          await delay(delayTime);
          attempt++;
        }
      } catch (error) {
        console.error('Error fetching prediction data:', error);
        return false;
      }
    }

    return false;
  }
}

// Adjust model alias for backwards compatibility
Replicate.prototype.adjustModelAlias = adjustModelAlias;

module.exports = Replicate;
