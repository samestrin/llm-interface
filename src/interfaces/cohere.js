/**
 * @file src/interfaces/cohere.js
 * @class Cohere
 * @description Wrapper class for the Cohere API.
 * @param {string} apiKey - The API key for the Cohere API.
 */

const axios = require('axios');
const { adjustModelAlias } = require('../utils/adjustModelAlias.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const {
  returnSimpleMessageObject,
  returnModelByAlias,
} = require('../utils/utils.js');
const { cohereApiKey } = require('../config/config.js');
const config = require('../config/llmProviders.json');
const log = require('loglevel');

// Cohere class for interacting with the Cohere API
class Cohere {
  /**
   * Constructor for the Cohere class.
   * @param {string} apiKey - The API key for the Cohere API.
   */
  constructor(apiKey) {
    this.interfaceName = 'cohere';
    this.apiKey = apiKey || cohereApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the Cohere API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the Cohere API.
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
    const {
      stream = false,
      preamble,
      chat_history: optionsChatHistory,
      conversation_id,
      prompt_truncation = 'OFF',
      connectors,
      documents,
      temperature = 0.3,
      max_input_tokens,
      k = 0,
      p = 0.75,
      seed,
      stop_sequences,
      frequency_penalty = 0.0,
      presence_penalty = 0.0,
      tools,
      tool_results,
      force_single_step = false,
      max_tokens = 150,
    } = options;

    // Prepare the payload for the API call
    model =
      selectedModel ||
      options.model ||
      config[this.interfaceName].model.default.name;

    let payload, chatHistory;

    if (typeof message === 'string') {
      // If message is a string, prepare a simple payload
      payload = {
        chat_history: [],
        message,
        model,
        max_tokens,
        ...options,
      };
    } else {
      // If message is an object, prepare a payload with chat history and current message
      if (optionsChatHistory && Array.isArray(optionsChatHistory)) {
        chatHistory = optionsChatHistory;
      } else {
        // Convert messages to chat history format expected by the Cohere API
        chatHistory = messages.slice(0, -1).map((msg) => ({
          role: msg.role === 'user' ? 'USER' : 'CHATBOT',
          message: msg.content,
        }));
      }
      const currentMessage = messages[messages.length - 1].content;
      payload = {
        chat_history:
          chatHistory.length > 0
            ? chatHistory
            : [{ role: 'USER', message: '' }],
        message: currentMessage,
        model,
        max_tokens,
        // Include any additional options in the payload
        ...options,
      };
    }

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
        // Send the request to the Cohere API
        const response = await this.client.post('', payload);
        let responseContent = null;
        if (response && response.data && response.data.text) {
          responseContent = response.data.text;
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

Cohere.prototype.adjustModelAlias = adjustModelAlias;

module.exports = Cohere;
