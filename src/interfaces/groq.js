/**
 * @file src/interfaces/groq.js
 * @class Groq
 * @description Wrapper class for the Groq API.
 * @param {string} apiKey - The API key for the Groq API.
 */

const BaseInterface = require('./baseInterface.js');
const { groqApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');
const log = require('loglevel');
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
      return this.unescapeString(
        error.response?.data?.error?.failed_generation,
      );
    }

    return null;
  }
  /**
   * Unescapes common escape sequences in a string.
   * @param {string} str - The string with escape sequences.
   * @returns {string} - The unescaped string.
   */
  unescapeString(str) {
    return str
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\r/g, '\r')
      .replace(/\\f/g, '\f')
      .replace(/\\b/g, '\b')
      .replace(/\\v/g, '\v')
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\');
  }
}

module.exports = Groq;
