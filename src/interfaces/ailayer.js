/**
 * @file src/interfaces/ailayer.js
 * @class AILayer
 * @description Wrapper class for the AILayer API.
 * @param {string} apiKey - The API key for the AILayer API.
 */

const BaseInterface = require('./baseInterface.js');
const { ailayerApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'ailayer';

loadProviderConfig(interfaceName);
const config = getConfig();

class AILayer extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || ailayerApiKey, config[interfaceName].url);
  }
}

module.exports = AILayer;
