/**
 * @file src/interfaces/thebai.js
 * @class TheBAI
 * @description Wrapper class for the TheBAI API.
 * @param {string} apiKey - The API key for the TheBAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { thebaiApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class TheBAI extends BaseInterface {
  constructor(apiKey) {
    super('thebai', apiKey || thebaiApiKey, config['thebai'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }

  adjustOptions(options) {
    return { model_params: { ...options } };
  }
}

module.exports = TheBAI;
