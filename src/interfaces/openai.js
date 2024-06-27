/**
 * @file src/interfaces/openai.js
 * @class OpenAI
 * @description Wrapper class for the OpenAI API.
 * @param {string} apiKey - The API key for the OpenAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { openaiApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class OpenAI extends BaseInterface {
  constructor(apiKey) {
    super('openai', apiKey || openaiApiKey, config['openai'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = OpenAI;
