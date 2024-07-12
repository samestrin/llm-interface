/**
 * @file src/interfaces/llamacpp.js
 * @class LLamaCPP
 * @description Wrapper class for the LLamaCPP API.
 * @param {string} apiKey - The API key for the LLamaCPP API.
 */

const BaseInterface = require('./baseInterface.js');
const { llamacppApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'llamacpp';

loadProviderConfig(interfaceName);
const config = getConfig();

class LLamaCPP extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || llamacppApiKey, config[interfaceName].url);
  }
}

module.exports = LLamaCPP;
