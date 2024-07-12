/**
 * @file src/interfaces/anyscale.js
 * @class Anyscale
 * @description Wrapper class for the Anyscale API.
 * @param {string} apiKey - The API key for the Anyscale API.
 */

const BaseInterface = require('./baseInterface.js');
const { anyscaleApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'anyscale';

loadProviderConfig(interfaceName);
const config = getConfig();

class Anyscale extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || anyscaleApiKey, config[interfaceName].url);
  }
}

module.exports = Anyscale;
