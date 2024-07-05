/**
 * @file src/interfaces/bigmodel.js
 * @class Bigmodel
 * @description Wrapper class for the Bigmodel API.
 * @param {string} apiKey - The API key for the Bigmodel API.
 */

const BaseInterface = require('./baseInterface.js');
const { bigmodelApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class Bigmodel extends BaseInterface {
  constructor(apiKey) {
    super('bigmodel', apiKey || bigmodelApiKey, config['bigmodel'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = Bigmodel;
