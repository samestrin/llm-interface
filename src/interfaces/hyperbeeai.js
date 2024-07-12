/**
 * @file src/interfaces/hyperbeeai.js
 * @class HyperbeeAI
 * @description Wrapper class for the HyperbeeAI API.
 * @param {string} apiKey - The API key for the HyperbeeAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { hyperbeeaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'hyperbeeai';

loadProviderConfig(interfaceName);
const config = getConfig();

class HyperbeeAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || hyperbeeaiApiKey, config[interfaceName].url);
  }
}

module.exports = HyperbeeAI;
