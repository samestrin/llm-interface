/**
 * @file src/interfaces/novitaai.js
 * @class NovitaAI
 * @description Wrapper class for the NovitaAI API.
 * @param {string} apiKey - The API key for the NovitaAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { novitaaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'novitaai';

loadProviderConfig(interfaceName);
const config = getConfig();
class NovitaAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || novitaaiApiKey, config[interfaceName].url);
  }
}

module.exports = NovitaAI;
