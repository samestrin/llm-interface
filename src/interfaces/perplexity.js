/**
 * @file src/interfaces/perplexity.js
 * @class Perplexity
 * @description Wrapper class for the Perplexity API.
 * @param {string} apiKey - The API key for Perplexity API.
 */

const BaseInterface = require('./baseInterface.js');
const { perplexityApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'perplexity';

loadProviderConfig(interfaceName);
const config = getConfig();

class Perplexity extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || perplexityApiKey, config[interfaceName].url);
  }
}

module.exports = Perplexity;
