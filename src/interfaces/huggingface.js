/**
 * @file src/interfaces/huggingface.js
 * @class HuggingFace
 * @description Wrapper class for the Hugging Face API.
 * @param {string} apiKey - The API key for the Hugging Face API.
 */

const BaseInterface = require('./baseInterface.js');
const { huggingfaceApiKey } = require('../utils/loadApiKeysFromEnv.js');
const {
  getModelByAlias,
  getEmbeddingsModelByAlias,
} = require('../utils/config.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'huggingface';

loadProviderConfig(interfaceName);
const config = getConfig();

class HuggingFace extends BaseInterface {
  constructor(apiKey) {
    super(
      interfaceName,
      apiKey || huggingfaceApiKey,
      config[interfaceName].url,
    );
  }

  getRequestUrl(model) {
    model = getModelByAlias(interfaceName, model);
    return `${model}/v1/chat/completions`;
  }

  getEmbedRequestUrl(model) {
    model = getEmbeddingsModelByAlias(interfaceName, model);
    return `${model}`;
  }
}

module.exports = HuggingFace;
