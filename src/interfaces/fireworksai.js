/**
 * @file src/interfaces/fireworksai.js
 * @class FireworksAI
 * @description Wrapper class for the Fireworks AI API.
 * @param {string} apiKey - The API key for the Fireworks AI API.
 */

const BaseInterface = require('./baseInterface.js');
const { fireworksaiApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class FireworksAI extends BaseInterface {
  constructor(apiKey) {
    super(
      'fireworksai',
      apiKey || fireworksaiApiKey,
      config['fireworksai'].url,
    );
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = FireworksAI;
