/**
 * @file src/interfaces/friendliai.js
 * @class Friendli
 * @description Wrapper class for the FriendliAI API.
 * @param {string} apiKey - The API key for the FriendliAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { friendliApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'friendliai';

loadProviderConfig(interfaceName);
const config = getConfig();

class FriendliAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || friendliApiKey, config[interfaceName].url);
  }
}

module.exports = FriendliAI;
