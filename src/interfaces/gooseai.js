/**
 * @file src/interfaces/gooseai.js
 * @class GooseAI
 * @description Wrapper class for the GooseAI API.
 * @param {string} apiKey - The API key for the GooseAI API.
 */

const axios = require('axios');
const { adjustModelAlias, getModelByAlias } = require('../utils/config.js');
const { CacheManager } = require('../utils/cacheManager.js');
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
  constructor(apiKey, cacheConfig = {}) {
    this.interfaceName = 'gooseai';
    this.apiKey = apiKey || gooseaiApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-type': 'application/json',
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
   * Send a message to the GooseAI API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the GooseAI API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    const messageObject =
      typeof message === 'string' ? getMessageObject(message) : message;
    const cacheTimeoutSeconds =
      typeof interfaceOptions === 'number'
        ? interfaceOptions
        : interfaceOptions.cacheTimeoutSeconds;

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

    // Generate a cache key based on the payload
    const cacheKey = JSON.stringify(payload);
    if (cacheTimeoutSeconds) {
      const cachedResponse = await this.cache.getFromCache(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

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
        if (interfaceOptions.attemptJsonRepair) {
          responseContent = await parseJSON(
            responseContent,
            interfaceOptions.attemptJsonRepair,
          );
        }
        // Build response object
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
}

GooseAI.prototype.adjustModelAlias = adjustModelAlias;

module.exports = GooseAI;
