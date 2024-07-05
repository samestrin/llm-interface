/**
 * @file src/interfaces/gooseai.js
 * @class GooseAI
 * @description Wrapper class for the GooseAI API.
 * @param {string} apiKey - The API key for the GooseAI API.
 */

const axios = require('axios');
const { getModelByAlias } = require('../utils/config.js');
const { getMessageObject, delay } = require('../utils/utils.js');
const { gooseaiApiKey } = require('../config/config.js');
const { getConfig } = require('../utils/configManager.js');
const { RequestError } = require('../utils/errors.js');
const config = getConfig();
const log = require('loglevel');

// GooseAI class for interacting with the GooseAI API
class GooseAI {
  /**
   * Constructor for the GooseAI class.
   * @param {string} apiKey - The API key for the GooseAI API.
   */
  constructor(apiKey) {
    this.interfaceName = 'gooseai';
    this.apiKey = apiKey || gooseaiApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the GooseAI API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the GooseAI API.
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

    // Get the selected model based on alias or default
    model = getModelByAlias(this.interfaceName, model);

    // Format the prompt by joining message contents
    const formattedPrompt = messages
      .map((message) => message.content)
      .join(' ');

    // Prepare the payload for the API call
    const payload = {
      prompt: formattedPrompt,
      model,
      max_tokens,
      ...options,
    };

    // Set up retry mechanism with exponential backoff
    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;
    const url = `/${model}/completions`;
    const thisUrl = this.client.defaults.baseURL + url;

    while (retryAttempts >= 0) {
      try {
        // Send the request to the GooseAI API

        const response = await this.client.post(url, payload);
        let responseContent = null;
        if (
          response &&
          response.data &&
          response.data.choices &&
          response.data.choices[0] &&
          response.data.choices[0].text
        ) {
          responseContent = response.data.choices[0].text.trim();
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

module.exports = GooseAI;
