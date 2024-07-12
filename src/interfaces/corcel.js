/**
 * @file src/interfaces/corcel.js
 * @class Corcel
 * @description Wrapper class for the Corcel API.
 * @param {string} apiKey - The API key for the Corcel API.
 */

const BaseInterface = require('./baseInterface.js');
const { corcelApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'corcel';

loadProviderConfig(interfaceName);
const config = getConfig();

class Corcel extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || corcelApiKey, config[interfaceName].url, {
      Authorization: apiKey || corcelApiKey,
    });
  }
  adjustOptions(options) {
    return { stream: false, ...options };
  }
}

module.exports = Corcel;
