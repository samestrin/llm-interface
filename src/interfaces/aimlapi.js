/**
 * @file src/interfaces/aimlapi.js
 * @class AIMLAPI
 * @description Wrapper class for the AIMLAPI API.
 * @param {string} apiKey - The API key for the AIMLAPI API.
 */

const BaseInterface = require('./baseInterface.js');
const { aimlapiApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class AIMLAPI extends BaseInterface {
  constructor(apiKey) {
    super('aimlapi', apiKey || aimlapiApiKey, config['aimlapi'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = AIMLAPI;
