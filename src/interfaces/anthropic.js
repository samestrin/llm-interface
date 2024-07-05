/**
 * @file src/interfaces/anthropic.js
 * @class Anthropic
 * @description Wrapper class for the Anthropic API.
 * @param {string} apiKey - The API key for the Anthropic API.
 */

const AnthropicSDK = require('@anthropic-ai/sdk');
const { getModelByAlias } = require('../utils/config.js');
const { getSimpleMessageObject, delay } = require('../utils/utils.js');
const { anthropicApiKey } = require('../config/config.js');
const { getConfig } = require('../utils/configManager.js');
const { RequestError } = require('../utils/errors.js');

const config = getConfig();
const log = require('loglevel');

// Anthropic class for interacting with the Anthropic API
class Anthropic {
  /**
   * Constructor for the Anthropic class.
   * @param {string} apiKey - The API key for the Anthropic API.
   */
  constructor(apiKey) {
    this.interfaceName = 'anthropic';
    this.anthropic = new AnthropicSDK({
      apiKey: apiKey || anthropicApiKey,
    });
  }

  /**
   * Send a message to the Anthropic API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the Anthropic API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    // Convert a string message to a simple message object
    const messageObject =
      typeof message === 'string' ? getSimpleMessageObject(message) : message;

    // Extract model and messages from the message object
    let { model, messages } = messageObject;

    // Finalize the model name
    model =
      model || options.model || config[this.interfaceName].model.default.name;
    if (options.model) delete options.model;

    // Get the selected model based on alias or default
    const selectedModel = getModelByAlias(this.interfaceName, model);
    // Set default value for max_tokens
    const { max_tokens = 150 } = options;

    // Convert messages to the format expected by the Anthropic API
    const convertedMessages = messages.map((msg, index) => {
      if (index === 0) {
        return { ...msg, role: 'user' };
      }
      if (msg.role === 'system') {
        return { ...msg, role: 'assistant' };
      }
      return { ...msg, role: index % 2 === 0 ? 'user' : 'assistant' };
    });

    // Prepare the parameters for the API call
    const params = {
      model:
        selectedModel ||
        options.model ||
        config[this.interfaceName].model.default.name,
      messages: convertedMessages,
      max_tokens,
      ...options,
    };

    // Set up retry mechanism with exponential backoff
    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;
    while (retryAttempts >= 0) {
      try {
        // Send the request to the Anthropic API
        const response = await this.anthropic.messages.create(params);
        // Extract the response content from the API response
        let responseContent = null;
        if (
          response &&
          response.content &&
          response.content[0] &&
          response.content[0].text
        ) {
          responseContent = response.content[0].text;
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

          // Return the response content
          return responseContent;
        }
      } catch (error) {
        // Decrease the number of retry attempts
        retryAttempts--;
        if (retryAttempts < 0) {
          // Log any errors and throw the error
          log.error('Error:', error.response ? error.response.data : null);

          throw new RequestError(
            `Unable to connect using Anthropic SDK (${retryAttempts + 1} attempts`,
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

module.exports = Anthropic;
