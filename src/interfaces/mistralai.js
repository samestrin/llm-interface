/**
 * @file src/interfaces/mistralai.js
 * @class MistralAI
 * @description Wrapper class for the MistralAI API.
 * @param {string} apiKey - The API key for the MistralAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { mistralaiApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class MistralAI extends BaseInterface {
  constructor(apiKey) {
    super('mistralai', apiKey || mistralaiApiKey, config['mistralai'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = MistralAI;
