/**
 * @file src/interfaces/forefront.js
 * @class Forefront
 * @description Wrapper class for the Forefront API.
 * @param {string} apiKey - The API key for the Forefront API.
 */

const BaseInterface = require('./baseInterface.js');
const { forefrontApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'forefront';

loadProviderConfig(interfaceName);
const config = getConfig();

class Forefront extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || forefrontApiKey, config[interfaceName].url);
  }
}

module.exports = Forefront;
