/**
 * @file src/interfaces/groq.js
 * @class Groq
 * @description Wrapper class for the Groq API.
 * @param {string} apiKey - The API key for the Groq API.
 */

const BaseInterface = require('./baseInterface.js');
const { groqApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class Groq extends BaseInterface {
  constructor(apiKey) {
    super('groq', apiKey || groqApiKey, config['groq'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = Groq;
