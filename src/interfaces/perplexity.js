/**
 * @file src/interfaces/perplexity.js
 * @class Perplexity
 * @description Wrapper class for the Perplexity API.
 * @param {string} apiKey - The API key for the Perplexity API.
 */

const BaseInterface = require('./baseInterface.js');
const { perplexityApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class Perplexity extends BaseInterface {
  constructor(apiKey) {
    super('perplexity', apiKey || perplexityApiKey, config['perplexity'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = Perplexity;
