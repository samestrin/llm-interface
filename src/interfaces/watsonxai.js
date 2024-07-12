/**
 * @file src/interfaces/watsonxai.js
 * @class WatsonxAI
 * @description Wrapper class for the watsonx.ai API.
 * @param {string} apiKey - The API key for the watsonx.ai API.
 * @param {string} spaceId - The Space ID for the watsonx.ai API.
 */

const BaseInterface = require('./baseInterface.js');
const axios = require('axios');
const {
  watsonxaiApiKey,
  watsonxaiSpaceId,
} = require('../utils/loadApiKeysFromEnv.js');
const { SendMessageError } = require('../utils/errors.js');
const log = require('loglevel');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'watsonxai';

loadProviderConfig(interfaceName);
const config = getConfig();

// WatsonX class for interacting with the watsonx.ai API
class WatsonxAI extends BaseInterface {
  /**
   * Constructor for the WatsonX class.
   * @param {string} apiKey - The API key for the watsonx.ai API.
   * @param {string} spaceId - The space ID for the watsonx.ai API.
   */
  constructor(apiKey, spaceId) {
    super(interfaceName, apiKey || watsonxaiApiKey, config[interfaceName].url);

    this.spaceId = spaceId || watsonxaiSpaceId;
    this.bearerToken = null;
    this.tokenExpiration = null;
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
    const url = 'https://iam.cloud.ibm.com/identity/token';

    try {
      const response = await axios.post(url, null, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
          apikey: this.apiKey,
        },
      });

      this.bearerToken = response.data.access_token;
      this.tokenExpiration = response.data.expiration;
      this.client.defaults.headers.Authorization = `Bearer ${this.bearerToken}`;
    } catch (error) {
      log.error(
        'Failed to get bearer token:',
        error.response ? error.response.data : error.message,
      );
      throw new SendMessageError(
        `Unable to get bearer token.`,
        error.message,
        error.stack,
      );
    }
  }

  /**
   * Override to build the request body specific to watsonx.ai API.
   * @param {string} model - The model to use for the request.
   * @param {Array<object>} messages - An array of message objects.
   * @param {number} max_tokens - The maximum number of tokens for the response.
   * @param {object} options - Additional options for the API request.
   * @returns {object} The constructed request body.
   */
  buildRequestBody(model, messages, max_tokens, options) {
    const formattedPrompt = messages
      .map((message) => message.content)
      .join(' ');

    return {
      model_id: model,
      input: formattedPrompt,
      parameters: {
        max_new_tokens: max_tokens,
        time_limit: options.time_limit || 1000,
      },
      space_id: options.space_id || this.spaceId,
    };
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

    return super.sendMessage(message, options, interfaceOptions);
  }

  async embeddings(prompt, options = {}, interfaceOptions = {}) {
    await this.getBearerToken(); // Ensure the bearer token is valid

    return super.embeddings(prompt, options, interfaceOptions);
  }

  adjustEmbeddingPrompt(prompt) {
    prompt = [prompt];
    return prompt;
  }
}

module.exports = WatsonxAI;
