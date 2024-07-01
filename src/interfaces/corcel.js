/**
 * @file src/interfaces/corcel.js
 * @class Corcel
 * @description Wrapper class for the Corcel API.
 * @param {string} apiKey - The API key for the Corcel API.
 */

const BaseInterface = require('./baseInterface.js');
const { corcelApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class Corcel extends BaseInterface {
  constructor(apiKey) {
    super('corcel', apiKey || corcelApiKey, config['corcel'].url, { "Authorization": apiKey || corcelApiKey });
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = Corcel;
