/**
 * @file src/interfaces/ollama.js
 * @class Ollama
 * @description Wrapper class for the Ollama API.
 * @param {string} apiKey - The API key for Ollama API.
 */

const BaseInterface = require('./baseInterface.js');
const { ollamaApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'ollama';

loadProviderConfig(interfaceName);
const config = getConfig();

class Ollama extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || ollamaApiKey, config[interfaceName].url);
  }

  adjustOptions(options) {
    return { stream: false, ...options };
  }
}

module.exports = Ollama;
