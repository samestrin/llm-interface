/**
 * @file src/interfaces/novitaai.js
 * @class NovitaAI
 * @description Wrapper class for the NovitaAI API.
 * @param {string} apiKey - The API key for the NovitaAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { novitaaiApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class NovitaAI extends BaseInterface {
  constructor(apiKey) {
    super('novitaai', apiKey || novitaaiApiKey, config['novitaai'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = NovitaAI;
