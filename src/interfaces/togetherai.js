/**
 * @file src/interfaces/togetherai.js
 * @class TogetherAI
 * @description Wrapper class for the Together AI API.
 * @param {string} apiKey - The API key for Together AI.
 */

const BaseInterface = require('./baseInterface.js');
const { togetherAIApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'togetherai';

loadProviderConfig(interfaceName);
const config = getConfig();

class TogetherAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || togetherAIApiKey, config[interfaceName].url);
  }
}

module.exports = TogetherAI;
