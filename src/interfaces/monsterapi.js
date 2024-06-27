/**
 * @file src/interfaces/monsterapi.js
 * @class MonsterAPI
 * @description Wrapper class for the MonsterAPI API.
 * @param {string} apiKey - The API key for the MonsterAPI API.
 */

const BaseInterface = require('./baseInterface.js');
const { monsterapiApiKey } = require('../config/config.js');
const { getMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class MonsterAPI extends BaseInterface {
  constructor(apiKey) {
    super('monsterapi', apiKey || monsterapiApiKey, config['monsterapi'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string' ? getMessageObject(message) : message;
  }
}

module.exports = MonsterAPI;
