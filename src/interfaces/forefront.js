/**
 * @file src/interfaces/forefront.js
 * @class Forefront
 * @description Wrapper class for the Forefront API.
 * @param {string} apiKey - The API key for the Forefront API.
 */

const BaseInterface = require('./baseInterface.js');
const { forefrontApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class Forefront extends BaseInterface {
  constructor(apiKey) {
    super('forefront', apiKey || forefrontApiKey, config['forefront'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}


module.exports = Forefront;
