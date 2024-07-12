/**
 * @file src/interfaces/octoai.js
 * @class OctoAI
 * @description Wrapper class for the OctoAI API.
 * @param {string} apiKey - The API key for OctoAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { octoaiAIApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'octoai';

loadProviderConfig(interfaceName);
const config = getConfig();

class OctoAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || octoaiAIApiKey, config[interfaceName].url);
  }
}

module.exports = OctoAI;
