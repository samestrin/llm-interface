/**
 * @file src/interfaces/shuttleai.js
 * @class ShuttleAI
 * @description Wrapper class for the ShuttleAI API.
 * @param {string} apiKey - The API key for the ShuttleAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { shuttleaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'shuttleai';

loadProviderConfig(interfaceName);
const config = getConfig();

class ShuttleAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || shuttleaiApiKey, config[interfaceName].url);
  }
}

module.exports = ShuttleAI;
