/**
 * @file src/interfaces/gooseai.js
 * @class GooseAI
 * @description Wrapper class for the GooseAI API, extends BaseInterface.
 * @param {string} apiKey - The API key for the GooseAI API.
 */

const BaseInterface = require('./baseInterface'); // Adjust the path as necessary
const { gooseaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'gooseai';

loadProviderConfig(interfaceName);
const config = getConfig();

class GooseAI extends BaseInterface {
  /**
   * Constructor for the GooseAI class.
   * @param {string} apiKey - The API key for the GooseAI API.
   */
  constructor(apiKey) {
    super(interfaceName, apiKey || gooseaiApiKey, config[interfaceName].url);
  }

  /**
   * Method to construct the request URL.
   * @param {string} model - The model to use for the request.
   * @returns {string} The request URL.
   */
  getRequestUrl(model) {
    return `/${model}/completions`;
  }

  /**
   * Builds the request body for the API request.
   *
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
    const requestBody = {
      prompt: formattedPrompt,
      model,
      max_tokens,
      ...options,
    };
    return requestBody;
  }
}

module.exports = GooseAI;
