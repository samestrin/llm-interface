/**
 * @file src/interfaces/nvidia.js
 * @class NVIDIA
 * @description Wrapper class for the NVIDIA API.
 * @param {string} apiKey - The API key for the NVIDIA API.
 */

const BaseInterface = require('./baseInterface.js');
const { nvidiaApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'nvidia';

loadProviderConfig(interfaceName);
const config = getConfig();

class NVIDIA extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || nvidiaApiKey, config[interfaceName].url);
  }
}

module.exports = NVIDIA;
