/**
 * @file src/interfaces/deepseek.js
 * @class DeepSeek
 * @description Wrapper class for the DeepSeek API.
 * @param {string} apiKey - The API key for the DeepSeek API.
 */

const BaseInterface = require('./baseInterface.js');
const { deepseekApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'deepseek';

loadProviderConfig(interfaceName);
const config = getConfig();

class DeepSeek extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || deepseekApiKey, config[interfaceName].url);
  }
}

module.exports = DeepSeek;
