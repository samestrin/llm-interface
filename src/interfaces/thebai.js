/**
 * @file src/interfaces/thebai.js
 * @class TheBAI
 * @description Wrapper class for the TheBAI API.
 * @param {string} apiKey - The API key for the TheBAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { thebaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'thebai';

loadProviderConfig(interfaceName);
const config = getConfig();

class TheBAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || thebaiApiKey, config[interfaceName].url);
  }

  adjustOptions(options) {
    return { model_params: { ...options } };
  }
}

module.exports = TheBAI;
