/**
 * @file src/interfaces/aimlapi.js
 * @class AIMLAPI
 * @description Wrapper class for the AIMLAPI API.
 * @param {string} apiKey - The API key for the AIMLAPI API.
 */

const BaseInterface = require('./baseInterface.js');
const { aimlapiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'aimlapi';

loadProviderConfig(interfaceName);
const config = getConfig();

class AIMLAPI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || aimlapiApiKey, config[interfaceName].url);
  }
}

module.exports = AIMLAPI;
