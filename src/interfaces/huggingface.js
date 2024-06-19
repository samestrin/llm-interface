/**
 * @file src/interfaces/huggingface.js
 * @class HuggingFace
 * @description Wrapper class for the Hugging Face API.
 * @param {string} apiKey - The API key for the Hugging Face API.
 */

const axios = require('axios');
const { getFromCache, saveToCache } = require('../utils/cache');
const {
  returnSimpleMessageObject,
  returnModelByAlias,
} = require('../utils/utils');
const { huggingfaceApiKey } = require('../config/config');
const config = require('../config/llmProviders.json');
const log = require('loglevel');

// HuggingFace class for interacting with the Hugging Face API
class HuggingFace {
  /**
   * Constructor for the HuggingFace class.
   * @param {string} apiKey - The API key for the Hugging Face API.
   */
  constructor(apiKey) {
    this.interfaceName = 'huggingface';
    this.apiKey = apiKey || huggingfaceApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the Hugging Face API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string|null} The response content from the Hugging Face API or null if an error occurs.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    const messageObject =
      typeof message === 'string'
        ? returnSimpleMessageObject(message)
        : message;
    const cacheTimeoutSeconds =
      typeof interfaceOptions === 'number'
        ? interfaceOptions
        : interfaceOptions.cacheTimeoutSeconds;

    let { model, messages } = messageObject;
    const selectedModel = returnModelByAlias(this.interfaceName, model);

    // Set the model and default values
    model =
      selectedModel ||
      options.model ||
      config[this.interfaceName].model.default.name;

    // Support both styles of max tokens
    const { max_tokens = 150 } = options;

    // Format the prompt by joining message contents
    const prompt = messages.map((msg) => msg.content).join(' ');

    // remove max_tokens if it exists
    if (options.max_tokens) delete options.max_tokens;

    // Prepare the payload for the API call
    const payload = {
      inputs: prompt,
      parameters: { max_new_tokens: max_tokens, ...options },
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
        // Send the request to the Hugging Face API
        const response = await this.client.post(`${model}`, payload);
        let responseContent = null;
        if (
          response &&
          response.data &&
          response.data[0] &&
          response.data[0].generated_text
        ) {
          responseContent = response.data[0].generated_text;
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

        // Implement progressive delay
        const delay = (currentRetry + 1) * 0.3 * 1000; // milliseconds
        await new Promise((resolve) => setTimeout(resolve, delay));
        currentRetry++;
      }
    }
  }
}

module.exports = HuggingFace;
