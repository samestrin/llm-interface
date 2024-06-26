/**
 * @file src/interfaces/togetherai.js
 * @class TogetherAI
 * @description Wrapper class for the Together AI API.
 * @param {string} apiKey - The API key for Together AI.
 */

const BaseInterface = require('./baseInterface.js');
const { togetherAIApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class TogetherAI extends BaseInterface {
  constructor(apiKey) {
    super('togetherai', apiKey || togetherAIApiKey, config['togetherai'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = TogetherAI;
