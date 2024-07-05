/**
 * @file src/interfaces/cohere.js
 * @class Cohere
 * @description Wrapper class for the Cohere API.
 * @param {string} apiKey - The API key for the Cohere API.
 */

const axios = require('axios');
const { getModelByAlias } = require('../utils/config.js');
const { getSimpleMessageObject, delay } = require('../utils/utils.js');
const { cohereApiKey } = require('../config/config.js');
const { getConfig } = require('../utils/configManager.js');
const { RequestError } = require('../utils/errors.js');
const config = getConfig();
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
      typeof message === 'string' ? getSimpleMessageObject(message) : message;

    let { model, messages } = messageObject;
    const selectedModel = getModelByAlias(this.interfaceName, model);
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

    // Finalize the model name
    model =
      selectedModel ||
      options.model ||
      config[this.interfaceName].model.default.name;
    if (options.model) delete options.model;

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

    // Set up retry mechanism with exponential backoff
    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;

    const thisUrl = this.client.defaults.baseURL;

    while (retryAttempts >= 0) {
      try {
        // Send the request to the Cohere API
        const response = await this.client.post('', payload);
        let responseContent = null;
        if (response && response.data && response.data.text) {
          responseContent = response.data.text;
        }

        // Attempt to repair the object if needed
        if (
          responseContent &&
          options.response_format === 'json_object' &&
          typeof responseContent === 'string'
        ) {
          try {
            responseContent = JSON.parse(responseContent);
          } catch {
            responseContent = await parseJSON(
              responseContent,
              interfaceOptions.attemptJsonRepair,
            );
          }
        } else if (responseContent && interfaceOptions.attemptJsonRepair) {
          responseContent = await parseJSON(
            responseContent,
            interfaceOptions.attemptJsonRepair,
          );
        }

        if (responseContent) {
          // Build response object
          responseContent = { results: responseContent };

          // optionally include the original llm api response
          if (interfaceOptions.includeOriginalResponse) {
            responseContent.originalResponse = response.data;
          }

          return responseContent;
        }
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
          log.error('Error:', error.response ? error.response.data : null);
          throw new RequestError(
            `Unable to connect to ${thisUrl} (${retryAttempts + 1} attempts`,
            error.message,
            error.stack,
          );
        }

        // Calculate the delay for the next retry attempt
        let retryMultiplier = interfaceOptions.retryMultiplier || 0.3;
        const delayTime = (currentRetry + 1) * retryMultiplier * 1000;
        await delay(delayTime);

        currentRetry++;
      }
    }
  }
}

module.exports = Cohere;
