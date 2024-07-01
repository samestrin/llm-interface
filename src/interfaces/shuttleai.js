/**
 * @file src/interfaces/shuttleai.js
 * @class ShuttleAI
 * @description Wrapper class for the ShuttleAI API.
 * @param {string} apiKey - The API key for the ShuttleAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { shuttleaiApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class ShuttleAI extends BaseInterface {
  constructor(apiKey) {
    super('shuttleai', apiKey || shuttleaiApiKey, config['shuttleai'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = ShuttleAI;
