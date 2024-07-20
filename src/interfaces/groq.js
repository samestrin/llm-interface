/**
 * @file src/interfaces/groq.js
 * @class Groq
 * @description Wrapper class for the Groq API.
 * @param {string} apiKey - The API key for the Groq API.
 */

const BaseInterface = require('./baseInterface.js');
const { groqApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { unescapeString } = require('../utils/utils.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'groq';

loadProviderConfig(interfaceName);
const config = getConfig();

class Groq extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || groqApiKey, config[interfaceName].url);
    super.config = config;
  }

  recoverError(error) {
    if (error.response?.data?.error?.failed_generation) {
      return unescapeString(error.response?.data?.error?.failed_generation);
    }

    return null;
  }
}

module.exports = Groq;
