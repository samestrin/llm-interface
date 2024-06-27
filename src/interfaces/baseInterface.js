/**
 * @file src/interfaces/baseInterface.js
 * @class BaseInterface
 * @description Base class for interfacing with various APIs.
 * @param {string} interfaceName - The name of the interface.
 * @param {string} apiKey - The API key for the API.
 * @param {string} baseURL - The base URL for the API.
 * @param {object} headers - Additional headers for the API requests.
 */

const axios = require('axios');
const { adjustModelAlias, getModelByAlias } = require('../utils/config.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const { parseJSON } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();
const log = require('loglevel');

// BaseInterface class for interacting with various APIs
class BaseInterface {
  /**
   * Constructor for the BaseInterface class.
   * @param {string} interfaceName - The name of the interface.
   * @param {string} apiKey - The API key for the API.
   * @param {string} baseURL - The base URL for the API.
   * @param {object} headers - Additional headers for the API requests.
   */
  constructor(interfaceName, apiKey, baseURL, headers = {}) {
    this.interfaceName = interfaceName;
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Method to be implemented by derived classes to create the appropriate message object.
   * @abstract
   * @param {string|object} message - The message to send.
   * @returns {object} The message object.
   * @throws {Error} If the method is not implemented by a subclass.
   */
  createMessageObject(message) {
    throw new Error(
      'createMessageObject method must be implemented by subclass',
    );
  }

  /**
   * Method to construct the request URL, can be overridden by derived classes.
   * @param {string} model - The model to use for the request.
   * @returns {string} The request URL.
   */
  getRequestUrl(model) {
    return ''; // Default URL if not overridden
  }

  /**
   * Send a message to the API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    const messageObject = this.createMessageObject(message);

    const cacheTimeoutSeconds =
      typeof interfaceOptions === 'number'
        ? interfaceOptions
        : interfaceOptions.cacheTimeoutSeconds;

    const { model, messages } = messageObject;
    const selectedModel = getModelByAlias(this.interfaceName, model);

    const {
      temperature = 0.7,
      max_tokens = 150,
      stop_sequences = [''],
      response_format = '',
    } = options;

    const requestBody = {
      model:
        selectedModel ||
        options.model ||
        config[this.interfaceName].model.default.name,
      messages,
      max_tokens,
      ...options,
    };

    if (response_format) {
      requestBody.response_format = { type: response_format };
    }

    const cacheKey = JSON.stringify(requestBody);

    if (cacheTimeoutSeconds) {
      const cachedResponse = getFromCache(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    const url = this.getRequestUrl(
      selectedModel ||
        options.model ||
        config[this.interfaceName].model.default.name,
    );

    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;
    while (retryAttempts >= 0) {
      try {
        const response = await this.client.post(url, requestBody);
        let responseContent = null;
        if (
          response &&
          response.data &&
          response.data.choices &&
          response.data.choices[0] &&
          response.data.choices[0].message
        ) {
          responseContent = response.data.choices[0].message.content;
        }

        if (interfaceOptions.attemptJsonRepair) {
          responseContent = await parseJSON(
            responseContent,
            interfaceOptions.attemptJsonRepair,
          );
        }

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

        let retryMultiplier = interfaceOptions.retryMultiplier || 0.3;
        const delay = (currentRetry + 1) * retryMultiplier * 1000;

        await new Promise((resolve) => setTimeout(resolve, delay));
        currentRetry++;
      }
    }
  }
}

// Adjust model alias for backwards compatibility
BaseInterface.prototype.adjustModelAlias = adjustModelAlias;

module.exports = BaseInterface;
