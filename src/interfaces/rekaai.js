/**
 * @file src/interfaces/rekaai.js
 * @class RekaAI
 * @description Wrapper class for the Reka AI API.
 * @param {string} apiKey - The API key for Reka AI.
 */

const axios = require('axios');
const { adjustModelAlias } = require('../utils/adjustModelAlias.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const {
  returnSimpleMessageObject,
  returnModelByAlias,
} = require('../utils/utils.js');
const { rekaaiApiKey } = require('../config/config.js');
const config = require('../config/llmProviders.json');
const log = require('loglevel');

// RekaAI class for interacting with the Reka AI API
class RekaAI {
  /**
   * Constructor for the RekaAI class.
   * @param {string} apiKey - The API key for Reka AI.
   */
  constructor(apiKey) {
    this.interfaceName = 'rekaai';
    this.apiKey = apiKey || rekaaiApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });
  }

  /**
   * Send a message to the Reka AI API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string|null} The response content from the Reka AI API or null if an error occurs.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    const messageObject =
      typeof message === 'string'
        ? returnSimpleMessageObject(message)
        : message;
    let cacheTimeoutSeconds;
    if (typeof interfaceOptions === 'number') {
      cacheTimeoutSeconds = interfaceOptions;
    } else {
      cacheTimeoutSeconds = interfaceOptions.cacheTimeoutSeconds;
    }

    let { model } = messageObject;

    // Get the selected model based on alias or default
    model = returnModelByAlias(this.interfaceName, model);

    // Set the model and default values
    model =
      model || options.model || config[this.interfaceName].model.default.name;

    const { max_tokens = 150 } = options;

    // Convert message roles as required by the API
    const convertedMessages = messageObject.messages.map((msg, index) => {
      if (msg.role === 'system') {
        return { ...msg, role: 'assistant' };
      }
      return { ...msg, role: 'user' };
    });

    // Prepare the modified message for the API call
    const modifiedMessage = {
      messages: convertedMessages,
      model,
      max_tokens,
      stream: false,
    };

    // Generate a cache key based on the modified message
    const cacheKey = JSON.stringify(modifiedMessage);
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
        // Send the request to the Reka AI API
        const response = await this.client.post('', modifiedMessage);

        let responseContent = null;

        if (response.data?.responses?.[0]?.message?.content) {
          responseContent = response.data.responses[0].message.content;
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
          // Log any errors and throw the error
          log.error(
            'API Error:',
            error.response ? error.response.data : error.message,
          );
          throw new Error(error.response ? error.response.data : error.message);
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
RekaAI.prototype.adjustModelAlias = adjustModelAlias;
module.exports = RekaAI;
