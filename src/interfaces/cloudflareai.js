/**
 * @file src/interfaces/cloudflareai.js
 * @class CloudflareAI
 * @description Wrapper class for the CloudflareAI API.
 * @param {string} apiKey - The API key for the CloudflareAI API.
 */

const {
  cloudflareaiApiKey,
  cloudflareaiAccountId,
} = require('../utils/loadApiKeysFromEnv.js');
const BaseInterface = require('./baseInterface'); // Import BaseInterface
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'cloudflareai';

loadProviderConfig(interfaceName);
const config = getConfig();

// CloudflareAI class for interacting with the CloudflareAI LLM API
class CloudflareAI extends BaseInterface {
  /**
   * Constructor for the CloudflareAI class.
   * @param {string} apiKey - The API key for the CloudflareAI LLM API.
   */
  constructor(apiKey, accountId) {
    super(
      interfaceName,
      apiKey || cloudflareaiApiKey,
      config[interfaceName].url,
    );
    this.accountId = accountId || cloudflareaiAccountId;
  }

  /**
   * Get the request URL for CloudflareAI API.
   * @param {string} model - The model to use for the request.
   * @returns {string} The request URL.
   */
  getRequestUrl(model) {
    return `/${this.accountId}/ai/run/${model}`;
  }

  /**
   * Send a message to the CloudflareAI LLM API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the CloudflareAI LLM API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    // Use the base class sendMessage method
    return super.sendMessage(message, options, {
      ...interfaceOptions,
    });
  }

  /**
   * Stream a message to the CloudflareAI API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @returns {Promise} The Axios response stream.
   */
  async streamMessage(message, options = {}) {
    // Use the base class streamMessage method
    return super.streamMessage(message, options);
  }

  /**
   * Get the embed request URL for CloudflareAI API.
   * @param {string} model - The model to use for the request.
   * @returns {string} The request URL.
   */
  getEmbedRequestUrl(model) {
    return `/${this.accountId}/ai/run/${model}`;
  }

  adjustEmbeddingPrompt(prompt) {
    prompt = [prompt];
    return prompt;
  }
}

module.exports = CloudflareAI;
