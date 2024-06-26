/**
 * @file src/interfaces/nvidia.js
 * @class NVIDIA
 * @description Wrapper class for the NVIDIA API.
 * @param {string} apiKey - The API key for the NVIDIA API.
 */

const BaseInterface = require('./baseInterface.js');
const { nvidiaApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class NVIDIA extends BaseInterface {
  constructor(apiKey) {
    super('nvidia', apiKey || nvidiaApiKey, config['nvidia'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = NVIDIA;
