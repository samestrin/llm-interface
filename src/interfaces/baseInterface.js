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
const { CacheManager } = require('../utils/cacheManager.js');
const { parseJSON, delay } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const { RequestError } = require('../utils/errors.js');
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
  constructor(interfaceName, apiKey, baseURL, headers = {}, cacheConfig = {}) {
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

    // Instantiate CacheManager with appropriate configuration
    if (cacheConfig.cache && cacheConfig.config) {
      this.cache = new CacheManager({
        cacheType: cacheConfig.cache,
        cacheOptions: config,
      });
    } else if (cacheConfig.cache && cacheConfig.path) {
      this.cache = new CacheManager({
        cacheType: cacheConfig.cache,
        cacheDir: cacheConfig.path,
      });
    } else {
      this.cache = new CacheManager({
        cacheType: 'simple-cache',
        cacheDir: cacheConfig.path,
      });
    }
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
   * Method to update the message object if needed.
   * Can be overridden by derived classes to transform the message object.
   * @param {object} messageObject - The message object to be updated.
   * @returns {object} The updated message object.
   */
  updateMessageObject(messageObject) {
    return messageObject; // Default implementation does nothing
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
   * Method to adjust options, can be overridden by derived classes.
   * @param {object} optons - The optons to use for the request.
   * @returns {object} The request URL.
   */
  adjustOptions(options) {
    return options;
  }

  /**
   * Send a message to the API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    let messageObject =
      typeof message === 'string' ? this.createMessageObject(message) : message;

    // Update the message object if needed
    messageObject = this.updateMessageObject(messageObject);

    const cacheTimeoutSeconds =
      typeof interfaceOptions === 'number'
        ? interfaceOptions
        : interfaceOptions.cacheTimeoutSeconds;

    let { model, messages } = messageObject;

    // Finalize the model name
    model =
      model || options.model || config[this.interfaceName].model.default.name;
    if (options.model) delete options.model;

    const selectedModel = getModelByAlias(this.interfaceName, model);

    const { max_tokens = 150, response_format = '' } = options;

    // Adjust options
    options = this.adjustOptions(options);

    const requestBody = {
      model: selectedModel,
      messages,
      max_tokens,
      ...options,
    };

    // log the requestBody for debugging
    log.log(requestBody);

    if (response_format) {
      requestBody.response_format = { type: response_format };
    }

    const cacheKey = JSON.stringify({ requestBody, interfaceOptions });

    if (cacheTimeoutSeconds) {
      const cachedResponse = await this.cache.getFromCache(cacheKey);

      if (cachedResponse) {
        return cachedResponse;
      }
    }

    const url = this.getRequestUrl(selectedModel);

    let retryAttempts = interfaceOptions.retryAttempts || 0;

    let currentRetry = 0;

    const thisUrl = this.client.defaults.baseURL + url;

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
          await this.cache.saveToCache(
            cacheKey,
            responseContent,
            cacheTimeoutSeconds,
          );
        }

        return responseContent;
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
          log.error('Error:', error.response ? error.response.data : null);
          throw new RequestError(`Unable to connect to ${thisUrl}`);
        }

        // Calculate the delay for the next retry attempt
        let retryMultiplier = interfaceOptions.retryMultiplier || 0.3;
        const delayTime = (currentRetry + 1) * retryMultiplier * 1000;
        await delay(delayTime);

        currentRetry++;
      }
    }
  }

  /**
   * Stream a message to the API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @returns {Promise} The Axios response stream.
   */
  async streamMessage(message, options = {}) {
    // Create the message object if a string is provided, otherwise use the provided object
    let messageObject =
      typeof message === 'string' ? this.createMessageObject(message) : message;

    // Update the message object if needed
    messageObject = this.updateMessageObject(messageObject);

    // Extract model and messages from the message object
    let { model, messages } = messageObject;

    // Finalize the model name
    model =
      model || options.model || config[this.interfaceName].model.default.name;
    if (options.model) delete options.model;

    const selectedModel = getModelByAlias(this.interfaceName, model);

    // Set default values for max_tokens and response_format
    const { max_tokens = 150, response_format = '' } = options;

    // Construct the request body with model, messages, max_tokens, and additional options
    const requestBody = {
      model: selectedModel,
      messages,
      max_tokens,
      ...options,
      stream: true,
    };

    // Include response_format in the request body if specified
    if (response_format) {
      requestBody.response_format = { type: response_format };
    }

    // Construct the request URL
    const url = this.getRequestUrl(selectedModel);

    // Return the Axios POST request with response type set to 'stream'
    return this.client.post(url, requestBody, { responseType: 'stream' });
  }
}

// Adjust model alias for backwards compatibility
BaseInterface.prototype.adjustModelAlias = adjustModelAlias;

module.exports = BaseInterface;
