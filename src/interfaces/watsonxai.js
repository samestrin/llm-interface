/**
 * @file src/interfaces/watsonxai.js
 * @class WatsonX
 * @description Wrapper class for the watsonx.ai API.
 * @param {string} apiKey - The API key for the watsonx.ai API.
 */

const axios = require('axios');

const { adjustModelAlias, getModelByAlias } = require('../utils/config.js');
const { getFromCache, saveToCache } = require('../utils/cache.js');
const { getMessageObject, delay } = require('../utils/utils.js');
const { watsonxaiApiKey, watsonxaiSpaceId } = require('../config/config.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();
const log = require('loglevel');

// WatsonX class for interacting with the watsonx.ai API
class watsonxai {
  /**
   * Constructor for the WatsonX class.
   * @param {string} apiKey - The API key for the watsonx.ai API.
   */
  constructor(apiKey, spaceId) {
    this.interfaceName = 'watsonxai';
    this.apiKey = apiKey || watsonxaiApiKey;
    this.spaceId = spaceId || watsonxaiSpaceId;
    this.bearerToken = null;
    this.tokenExpiration = null;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  /**
   * Get a bearer token using the provided API key.
   * If a valid token exists and is not expired, reuse it.
   * Otherwise, refresh the token.
   * @returns {Promise<void>}
   */
  async getBearerToken() {
    if (this.bearerToken && this.tokenExpiration > Date.now() / 1000) {
      return; // Token is still valid
    }

    try {
      const response = await axios.post(
        'https://iam.cloud.ibm.com/identity/token',
        null,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
            apikey: this.apiKey,
          },
        },
      );

      this.bearerToken = response.data.access_token;
      this.tokenExpiration = response.data.expiration;
      this.client.defaults.headers.Authorization = `Bearer ${this.bearerToken}`;
    } catch (error) {
      log.error(
        'Failed to get bearer token:',
        error.response ? error.response.data : error.message,
      );
      throw error;
    }
  }

  /**
   * Send a message to the watsonx.ai API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {Promise<string>} The response content from the watsonx.ai API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    await this.getBearerToken(); // Ensure the bearer token is valid

    const messageObject =
      typeof message === 'string' ? getMessageObject(message) : message;
    const cacheTimeoutSeconds =
      typeof interfaceOptions === 'number'
        ? interfaceOptions
        : interfaceOptions.cacheTimeoutSeconds;

    const { messages } = messageObject;
    const { max_tokens = 150, space_id } = options;
    let { model } = messageObject;

    // Set the model and default values
    model =
      model || options.model || config[this.interfaceName].model.default.name;
    if (options.model) delete options.model;

    model = getModelByAlias(this.interfaceName, model);

    const formattedPrompt = messages
      .map((message) => message.content)
      .join(' ');

    const payload = {
      model_id: model,
      input: formattedPrompt,
      parameters: {
        max_new_tokens: max_tokens,
        time_limit: options.time_limit || 1000,
      },
      space_id: space_id || this.spaceId,
    };

    const cacheKey = JSON.stringify(payload);
    if (cacheTimeoutSeconds) {
      const cachedResponse = getFromCache(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;
    while (retryAttempts >= 0) {
      try {
        const url = '';
        const response = await this.client.post(url, payload);
        let responseContent = null;
        if (
          response &&
          response.data &&
          response.data.results &&
          response.data.results[0] &&
          response.data.results[0].generated_text
        ) {
          responseContent = response.data.results[0].generated_text.trim();
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

        // Calculate the delay for the next retry attempt
        let retryMultiplier = interfaceOptions.retryMultiplier || 0.3;
        const delayTime = (currentRetry + 1) * retryMultiplier * 1000;
        await delay(delayTime);

        currentRetry++;
      }
    }
  }
}

watsonxai.prototype.adjustModelAlias = adjustModelAlias;

module.exports = watsonxai;
