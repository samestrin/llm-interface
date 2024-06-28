/**
 * @file src/interfaces/writer.js
 * @class Writer
 * @description Wrapper class for the Writer API.
 * @param {string} apiKey - The API key for the Writer API.
 */

const BaseInterface = require('./baseInterface.js');
const { writerApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class Writer extends BaseInterface {
  constructor(apiKey) {
    super('writer', apiKey || writerApiKey, config['writer'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = Writer;
