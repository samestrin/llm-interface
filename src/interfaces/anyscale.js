/**
 * @file src/interfaces/anyscale.js
 * @class Anyscale
 * @description Wrapper class for the Anyscale API.
 * @param {string} apiKey - The API key for the Anyscale API.
 */

const BaseInterface = require('./baseInterface.js');
const { anyscaleApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class Anyscale extends BaseInterface {
  constructor(apiKey) {
    super('anyscale', apiKey || anyscaleApiKey, config['anyscale'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = Anyscale;
