/**
 * @file src/interfaces/hyperbeeai.js
 * @class HyperbeeAI
 * @description Wrapper class for the HyperbeeAI API.
 * @param {string} apiKey - The API key for the HyperbeeAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { hyperbeeaiApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class HyperbeeAI extends BaseInterface {
  constructor(apiKey) {
    super('hyperbeeai', apiKey || hyperbeeaiApiKey, config['hyperbeeai'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = HyperbeeAI;
