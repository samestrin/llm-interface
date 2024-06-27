/**
 * @file src/interfaces/huggingface.js
 * @class HuggingFace
 * @description Wrapper class for the Hugging Face API.
 * @param {string} apiKey - The API key for the Hugging Face API.
 */

const BaseInterface = require('./baseInterface.js');
const { huggingfaceApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class HuggingFace extends BaseInterface {
  constructor(apiKey) {
    super(
      'huggingface',
      apiKey || huggingfaceApiKey,
      config['huggingface'].url,
    );
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }

  getRequestUrl(model) {
    return `${model}/v1/chat/completions`;
  }
}

module.exports = HuggingFace;
