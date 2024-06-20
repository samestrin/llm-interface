/**
 * @file src/interfaces/groq.js
 * @class Groq
 * @description Wrapper class for the Groq API.
 * @param {string} apiKey - The API key for the Groq API.
 */

const GroqSDK = require('groq-sdk');
const { adjustModelAlias } = require('../utils/adjustModelAlias.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const {
  returnMessageObject,
  returnModelByAlias,
} = require('../utils/utils.js');
const { groqApiKey } = require('../config/config.js');
const config = require('../config/llmProviders.json');
const log = require('loglevel');

// Groq class for interacting with the Groq API
class Groq {
  /**
   * Constructor for the Groq class.
   * @param {string} apiKey - The API key for the Groq API.
   */
  constructor(apiKey) {
    this.interfaceName = 'groq';
    this.apiKey = apiKey || groqApiKey;
    this.groq = new GroqSDK({
      apiKey: this.apiKey,
    });
  }

  /**
   * Send a message to the Groq API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the Groq API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    const messageObject =
      typeof message === 'string' ? returnMessageObject(message) : message;
    const cacheTimeoutSeconds =
      typeof interfaceOptions === 'number'
        ? interfaceOptions
        : interfaceOptions.cacheTimeoutSeconds;

    let { model } = messageObject;
    const selectedModel = returnModelByAlias(this.interfaceName, model);

    // Set the model and default values
    model =
      selectedModel ||
      options.model ||
      config[this.interfaceName].model.default.name;
    const { max_tokens = 150 } = options;

    // Prepare the parameters for the API call
    const params = {
      model,
      messages: messageObject.messages,
      max_tokens,
    };

    // Generate a cache key based on the parameters
    const cacheKey = JSON.stringify(params);
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
        // Send the request to the Groq API
        const chatCompletion = await this.groq.chat.completions.create(params);
        let responseContent = null;
        if (
          chatCompletion &&
          chatCompletion.choices &&
          chatCompletion.choices[0] &&
          chatCompletion.choices[0].message &&
          chatCompletion.choices[0].message.content
        ) {
          responseContent = chatCompletion.choices[0].message.content;
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

Groq.prototype.adjustModelAlias = adjustModelAlias;
module.exports = Groq;
