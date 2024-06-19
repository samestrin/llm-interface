/**
 * @file interfaces/cohere.js
 * @class Cohere
 * @description Wrapper class for the Cohere API.
 * @param {string} apiKey - The API key for the Cohere API.
 */

const axios = require('axios');
const { getFromCache, saveToCache } = require('../utils/cache');
const {
  returnSimpleMessageObject,
  returnModelByAlias,
} = require('../utils/utils');
const { cohereApiKey } = require('../config/config');
const config = require('../config/llm-providers.json');
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
      chatHistory: optionsChatHistory,
      conversationId,
      promptTruncation = 'OFF',
      connectors,
      documents,
      temperature = 0.3,
      maxTokens = 150,
      maxInputTokens,
      k = 0,
      p = 0.75,
      seed,
      stopSequences,
      frequencyPenalty = 0.0,
      presencePenalty = 0.0,
      tools,
      toolResults,
      forceSingleStep = false,
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
        chatHistory: [],
        message,
        model,
        maxTokens,
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
        chatHistory:
          chatHistory.length > 0
            ? chatHistory
            : [{ role: 'USER', message: '' }],
        message: currentMessage,
        model,
        maxTokens,
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

module.exports = Cohere;