/**
 * @file src/interfaces/rekaai.js
 * @class RekaAI
 * @extends BaseInterface
 * @description Wrapper class for the Reka AI API.
 * @param {string} apiKey - The API key for Reka AI API.
 */

const BaseInterface = require('./baseInterface');
const { rekaaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'rekaai';

loadProviderConfig(interfaceName);
const config = getConfig();

// RekaAI class for interacting with the Reka AI API
class RekaAI extends BaseInterface {
  /**
   * Constructor for the RekaAI class.
   * @param {string} apiKey - The API key for Reka AI.
   */
  constructor(apiKey) {
    super(interfaceName, apiKey || rekaaiApiKey, config[interfaceName].url, {
      'X-Api-Key': apiKey || rekaaiApiKey,
    });
  }

  /**
   * Updates the headers of an Axios client.
   * @param {object} client - The Axios client instance.
   */
  updateHeaders(client) {
    delete client.defaults.headers['Authorization'];
  }

  /**
   * Builds the request body for the API request.
   * @param {string} model - The model to use for the request.
   * @param {Array<object>} messages - An array of message objects.
   * @param {number} max_tokens - The maximum number of tokens for the response.
   * @param {object} options - Additional options for the API request.
   * @returns {object} The constructed request body.
   * @throws {Error} If the message roles do not alternate correctly or if the conversation does not start and end with 'user'.
   */
  buildRequestBody(model, messages, max_tokens, options) {
    // Step 1: Convert the format
    let convertedMessages = messages.map((msg) => {
      if (msg.role === 'system') {
        return { ...msg, role: 'assistant' };
      }
      return { ...msg, role: 'user' };
    });

    // Step 2: Check the first message role
    if (convertedMessages[0].role === 'user') {
      // If the first role is user, we can use convertedMessages as is
      // Proceed to create the request body
    } else {
      // Step 3: Check if the first message entry is the specific assistant message
      if (
        convertedMessages[0].role === 'assistant' &&
        convertedMessages[0].content === 'You are a helpful assistant.'
      ) {
        // Remove the first message
        convertedMessages.shift();
      } else {
        // Step 4: Prepend a user message if the first message is an assistant with any other content
        convertedMessages.unshift({ role: 'user', content: 'I need help.' });
      }
    }

    // Ensure messages alternate between 'user' and 'assistant'
    for (let i = 1; i < convertedMessages.length; i++) {
      if (convertedMessages[i].role === convertedMessages[i - 1].role) {
        throw new Error(
          'Messages must alternate between "user" and "assistant".',
        );
      }
    }

    // Ensure the conversation starts and ends with 'user'
    if (
      convertedMessages[0].role !== 'user' ||
      convertedMessages[convertedMessages.length - 1].role !== 'user'
    ) {
      throw new Error('Conversation must start and end with "user".');
    }

    // Step 5: Construct the request body
    const requestBody = {
      messages: convertedMessages,
      model,
      max_tokens,
      stream: false,
      ...options,
    };

    return requestBody;
  }
}

module.exports = RekaAI;
