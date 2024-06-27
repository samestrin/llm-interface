/**
 * @file src/interfaces/ai21.js
 * @class AI21
 * @description Wrapper class for the AI21 API.
 * @param {string} apiKey - The API key for the AI21 API.
 */

const BaseInterface = require('./baseInterface.js');
const { ai21ApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class AI21 extends BaseInterface {
  constructor(apiKey) {
    super('ai21', apiKey || ai21ApiKey, config['ai21'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = AI21;
