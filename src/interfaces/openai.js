/**
 * @file src/interfaces/openai.js
 * @class OpenAI
 * @description Wrapper class for the OpenAI API.
 * @param {string} apiKey - The API key for OpenAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { openaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'openai';

loadProviderConfig(interfaceName);
const config = getConfig();

class OpenAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || openaiApiKey, config[interfaceName].url);
  }
}

module.exports = OpenAI;
