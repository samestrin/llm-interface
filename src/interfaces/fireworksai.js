/**
 * @file src/interfaces/fireworksai.js
 * @class FireworksAI
 * @description Wrapper class for the Fireworks AI API.
 * @param {string} apiKey - The API key for the Fireworks AI API.
 */

const BaseInterface = require('./baseInterface.js');
const { fireworksaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'fireworksai';

loadProviderConfig(interfaceName);
const config = getConfig();

class FireworksAI extends BaseInterface {
  constructor(apiKey) {
    super(
      interfaceName,
      apiKey || fireworksaiApiKey,
      config[interfaceName].url,
    );
  }
}

module.exports = FireworksAI;
