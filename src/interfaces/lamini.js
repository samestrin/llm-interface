/**
 * @file src/interfaces/lamini.js
 * @class Lamini
 * @description Wrapper class for the Lamini API.
 * @param {string} apiKey - The API key for the Lamini API.
 */

const axios = require('axios');
const { getModelByAlias } = require('../utils/config.js');
const { getMessageObject, delay } = require('../utils/utils.js');
const { laminiApiKey } = require('../config/config.js');
const { getConfig } = require('../utils/configManager.js');
const { InitError, RequestError } = require('../utils/errors.js');
const config = getConfig();
const log = require('loglevel');

// Lamini class for interacting with the Lamini API
class Lamini {
  /**
   * Constructor for the Lamini class.
   * @param {string} apiKey - The API key for the Lamini API.
   */
  constructor(apiKey) {
    this.interfaceName = 'lamini';
    this.apiKey = apiKey || laminiApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the Lamini API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the Lamini API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    const messageObject =
      typeof message === 'string' ? getMessageObject(message) : message;

    const { messages } = messageObject;
    const { max_tokens = 150 } = options;
    let { model } = messageObject;

    // Set the model and default values
    model =
      model || options.model || config[this.interfaceName].model.default.name;
    if (options.model) delete options.model;
    if (options.max_tokens) delete options.max_tokens;

    // Get the selected model based on alias or default
    model = getModelByAlias(this.interfaceName, model);

    // Format the prompt by joining message contents
    const formattedPrompt = messages
      .map((message) => message.content)
      .join(' ');

    // Prepare the payload for the API call
    const payload = {
      prompt: formattedPrompt,
      model_name: model,
      output_type: { answer: 'str' },
      max_tokens,
      ...options,
    };

    // Set up retry mechanism with exponential backoff
    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;

    const thisUrl = this.client.defaults.baseURL;

    while (retryAttempts >= 0) {
      const response = await this.client.post('', payload);

      try {
        // Send the request to the Lamini API

        let responseContent = null;
        if (response && response.data && response.data.answer) {
          responseContent = response.data.answer.trim();
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
          log.error(
            'Error:',
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

module.exports = Lamini;
