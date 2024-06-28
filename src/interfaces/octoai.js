/**
 * @file src/interfaces/octoai.js
 * @class OctoAI
 * @description Wrapper class for the Together AI API.
 * @param {string} apiKey - The API key for Together AI.
 */

const BaseInterface = require('./baseInterface.js');
const { octoaiAIApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class OctoAI extends BaseInterface {
  constructor(apiKey) {
    super('octoai', apiKey || octoaiAIApiKey, config['octoai'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = OctoAI;
