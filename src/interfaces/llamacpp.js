/**
 * @file src/interfaces/llamacpp.js
 * @class LLamaCPP
 * @description Wrapper class for the LLamaCPP API.
 * @param {string} apiKey - The API key for the LLamaCPP API.
 */

const BaseInterface = require('./baseInterface.js');
const { llamacppApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class LLamaCPP extends BaseInterface {
  constructor(apiKey) {
    super('llamacpp', apiKey || llamacppApiKey, config['llamacpp'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = LLamaCPP;
