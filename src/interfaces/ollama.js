/**
 * @file src/interfaces/ollama.js
 * @class Ollama
 * @description Wrapper class for the Ollama API.
 * @param {string} apiKey - The API key for the Ollama API.
 */

const BaseInterface = require('./baseInterface.js');
const { ollamaApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class Ollama extends BaseInterface {
  constructor(apiKey) {
    super('ollama', apiKey || ollamaApiKey, config['ollama'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = Ollama;
