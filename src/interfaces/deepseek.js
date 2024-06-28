/**
 * @file src/interfaces/deepseek.js
 * @class DeepSeek
 * @description Wrapper class for the DeepSeek API.
 * @param {string} apiKey - The API key for the DeepSeek API.
 */

const BaseInterface = require('./baseInterface.js');
const { deepseekApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class DeepSeek extends BaseInterface {
  constructor(apiKey) {
    super('deepseek', apiKey || deepseekApiKey, config['deepseek'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = DeepSeek;
