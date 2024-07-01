/**
 * @file src/interfaces/ailayer.js
 * @class AILayer
 * @description Wrapper class for the AILayer API.
 * @param {string} apiKey - The API key for the AILayer API.
 */

const BaseInterface = require('./baseInterface.js');
const { ailayerApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class AILayer extends BaseInterface {
  constructor(apiKey) {
    super('ailayer', apiKey || ailayerApiKey, config['ailayer'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = AILayer;
