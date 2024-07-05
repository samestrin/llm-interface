/**
 * @file src/interfaces/neetsai.js
 * @class NeetsAI
 * @description Wrapper class for the NeetsAI API.
 * @param {string} apiKey - The API key for the NeetsAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { neetsaiApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class NeetsAI extends BaseInterface {
  constructor(apiKey) {
    super('neetsai', apiKey || neetsaiApiKey, config['neetsai'].url, {
      'X-API-Key': apiKey || neetsaiApiKey,
    });
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = NeetsAI;
