/**
 * @file src/interfaces/mistralai.js
 * @class MistralAI
 * @description Wrapper class for the MistralAI API.
 * @param {string} apiKey - The API key for the MistralAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { mistralaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'mistralai';

loadProviderConfig(interfaceName);
const config = getConfig();

class MistralAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || mistralaiApiKey, config[interfaceName].url);
  }

  adjustEmbeddingPrompt(prompt) {
    prompt = [prompt];
    return prompt;
  }
}

module.exports = MistralAI;
