/**
 * @file src/interfaces/cohere.js
 * @class Cohere
 * @description Wrapper class for the Cohere API.
 * @param {string} apiKey - The API key for the Cohere API.
 */

const BaseInterface = require('./baseInterface');
const { cohereApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');
const interfaceName = 'cohere';

loadProviderConfig(interfaceName);
const config = getConfig();

// Cohere class for interacting with the Cohere API
class Cohere extends BaseInterface {
  /**
   * Constructor for the Cohere class.
   * @param {string} apiKey - The API key for the Cohere API.
   */
  constructor(apiKey) {
    super(interfaceName, apiKey || cohereApiKey, config[interfaceName].url, {
      'Cohere-Version': '2022-12-06',
    });
  }

  /**
   * Builds the request body for the API request.
   *
   * @param {string} model - The model to use for the request.
   * @param {Array<object>} messages - An array of message objects.
   * @param {number} max_tokens - The maximum number of tokens for the response.
   * @param {object} options - Additional options for the API request.
   * @returns {object} The constructed request body.
   */
  buildRequestBody(model, messages, max_tokens, options) {
    let chatHistory;

    if (options.chat_history && Array.isArray(options.chat_history)) {
      chatHistory = options.chat_history;
    } else {
      chatHistory = messages.map((msg) => ({
        role: msg.role === 'user' ? 'USER' : 'CHATBOT',
        message: msg.content,
      }));
    }

    // Ensure chatHistory starts with a CHATBOT message
    if (chatHistory.length === 0 || chatHistory[0].role !== 'CHATBOT') {
      chatHistory.unshift({
        role: 'CHATBOT',
        message: 'You are a helpful assistant.',
      });
    }

    // If there are more than one items and it starts with CHATBOT USER, remove USER
    if (
      chatHistory.length > 1 &&
      chatHistory[0].role === 'CHATBOT' &&
      chatHistory[1].role === 'USER'
    ) {
      chatHistory.splice(1, 1);
    }

    // Ensure alternation between USER and CHATBOT
    for (let i = 1; i < chatHistory.length; i++) {
      if (chatHistory[i].role === chatHistory[i - 1].role) {
        chatHistory[i].role =
          chatHistory[i - 1].role === 'USER' ? 'CHATBOT' : 'USER';
      }
    }

    const currentMessage = messages[messages.length - 1].content;

    return {
      chat_history: chatHistory,
      message: currentMessage,
      model: model,
      max_tokens: max_tokens,
      ...options,
    };
  }

  /**
   * Method to construct the request URL for Cohere API.
   * @param {string} model - The model to use for the request.
   * @returns {string} The request URL.
   */
  getRequestUrl(model) {
    return ''; // Default URL if not overridden
  }

  /**
   * Adjust the embedding prompt specific to Cohere.
   * @param {string} prompt - The input prompt to adjust.
   * @returns {array} The adjusted embedding prompt.
   */
  adjustEmbeddingPrompt(prompt) {
    return [prompt];
  }
}

module.exports = Cohere;
