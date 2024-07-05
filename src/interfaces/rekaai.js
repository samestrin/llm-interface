/**
 * @file src/interfaces/rekaai.js
 * @class RekaAI
 * @description Wrapper class for the Reka AI API.
 * @param {string} apiKey - The API key for Reka AI.
 */

const axios = require('axios');

const { getModelByAlias } = require('../utils/config.js');
const { getSimpleMessageObject, delay } = require('../utils/utils.js');
const { rekaaiApiKey } = require('../config/config.js');
const { getConfig } = require('../utils/configManager.js');
const { RequestError } = require('../utils/errors.js');
const config = getConfig();
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
      typeof message === 'string' ? getSimpleMessageObject(message) : message;

    let { model } = messageObject;

    // Set the model and default values
    model =
      model || options.model || config[this.interfaceName].model.default.name;
    if (options.model) delete options.model;

    // Get the selected model based on alias or default
    model = getModelByAlias(this.interfaceName, model);

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
          // Log any errors and throw the error
          log.error(
            'API Error:',
            error.response ? error.response.data : error.message,
          );
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

module.exports = RekaAI;
