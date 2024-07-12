/**
 * @file src/interfaces/deepinfra.js
 * @class DeepInfra
 * @description Wrapper class for the DeepInfra API.
 * @param {string} apiKey - The API key for the DeepInfra API.
 */

const BaseInterface = require('./baseInterface.js');
const { deepinfra21ApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'deepinfra';

loadProviderConfig(interfaceName);
const config = getConfig();

class DeepInfra extends BaseInterface {
  constructor(apiKey) {
    super(
      interfaceName,
      apiKey || deepinfra21ApiKey,
      config[interfaceName].url,
    );
  }
}

module.exports = DeepInfra;
