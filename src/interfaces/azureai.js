/**
 * @file src/interfaces/azureai.js
 * @class azureai
 * @description Wrapper class for the Azure AI API.
 * @param {string} apiKey - The API key for the Azure AI API.
 */

const BaseInterface = require('./baseInterface.js');
const { azureaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const {
  getModelByAlias,
  getEmbeddingsModelByAlias,
} = require('../utils/config.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'azureai';

loadProviderConfig(interfaceName);
const config = getConfig();

class AzureAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || azureaiApiKey, config[interfaceName].url);
    this.baseURL = config[interfaceName].url;
    this.interfaceName = interfaceName;
  }

  getRequestUrl(model) {
    model = getModelByAlias(this.interfaceName, model);
    return `?api-version=${model}`;
  }
  /*
  getEmbedRequestUrl(model) {
    model = getEmbeddingsModelByAlias('azureai', model);
    return `${model}`;
    }
    */
}

module.exports = AzureAI;
