/**
 * @file src/interfaces/lamini.js
 * @class Lamini
 * @extends BaseInterface
 * @description Wrapper class for the Lamini API.
 * @param {string} apiKey - The API key for the Lamini API.
 */

const BaseInterface = require('./baseInterface');
const { laminiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'lamini';

loadProviderConfig(interfaceName);
const config = getConfig();

// Lamini class for interacting with the Lamini API
class Lamini extends BaseInterface {
  /**
   * Constructor for the Lamini class.
   * @param {string} apiKey - The API key for the Lamini API.
   */
  constructor(apiKey) {
    super(interfaceName, apiKey || laminiApiKey, config[interfaceName].url);
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
      model_name: model,
      output_type: options.output_type || { answer: 'str' },
      max_tokens,
      ...options,
    };
    return requestBody;
  }
}

module.exports = Lamini;
