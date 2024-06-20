/**
 * @file src/interfaces/openai.js
 * @class OpenAI
 * @description Wrapper class for the OpenAI API.
 * @param {string} apiKey - The API key for the OpenAI API.
 */

const { OpenAI: OpenAIClient } = require('openai');
const { adjustModelAlias } = require('../utils/adjustModelAlias.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const {
  returnMessageObject,
  returnModelByAlias,
  parseJSON,
} = require('../utils/utils.js');
const { openaiApiKey } = require('../config/config.js');
const config = require('../config/llmProviders.json');
const log = require('loglevel');

// OpenAI class for interacting with the OpenAI API
class OpenAI {
  /**
   * Constructor for the OpenAI class.
   * @param {string} apiKey - The API key for the OpenAI API.
   */
  constructor(apiKey) {
    this.interfaceName = 'openai';
    this.apiKey = apiKey || openaiApiKey;
    this.openai = new OpenAIClient({
      apiKey: this.apiKey,
    });
  }

  /**
   * Send a message to the OpenAI API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string|object} The response content from the OpenAI API.
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

    let { model, messages } = messageObject;
    const selectedModel = returnModelByAlias(this.interfaceName, model);

    // Set the model and default values
    model =
      selectedModel ||
      options.model ||
      config[this.interfaceName].model.default.name;
    if (options.model) options.model = model;

    const { max_tokens = 150, response_format = '' } = options;

    // Prepare the request payload for the API call
    const requestPayload = {
      model,
      messages,
      max_tokens,
      ...options,
    };

    // Add response_format if specified
    if (response_format) {
      requestPayload.response_format = { type: response_format };
    }

    // Generate a cache key based on the request payload
    const cacheKey = JSON.stringify(requestPayload);
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
        // Send the request to the OpenAI API
        const completion =
          await this.openai.chat.completions.create(requestPayload);
        let responseContent = null;
        if (
          completion &&
          completion.choices &&
          completion.choices[0] &&
          completion.choices[0].message
        ) {
          responseContent = completion.choices[0].message.content;
        }

        if (response_format === 'json_object') {
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
OpenAI.prototype.adjustModelAlias = adjustModelAlias;

module.exports = OpenAI;
