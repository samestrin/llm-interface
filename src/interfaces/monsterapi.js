/**
 * @file src/interfaces/monsterapi.js
 * @class MonsterAPI
 * @description Wrapper class for the MonsterAPI API.
 * @param {string} apiKey - The API key for the MonsterAPI API.
 */

const BaseInterface = require('./baseInterface.js');
const { monsterapiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'monsterapi';

loadProviderConfig(interfaceName);
const config = getConfig();

class MonsterAPI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || monsterapiApiKey, config[interfaceName].url);
  }
}

module.exports = MonsterAPI;
