/**
 * @file src/interfaces/deepinfra.js
 * @class DeepInfra
 * @description Wrapper class for the DeepInfra API.
 * @param {string} apiKey - The API key for the DeepInfra API.
 */

const BaseInterface = require('./baseInterface.js');
const { deepinfra21ApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class DeepInfra extends BaseInterface {
  constructor(apiKey) {
    super('deepinfra', apiKey || deepinfra21ApiKey, config['deepinfra'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = DeepInfra;
