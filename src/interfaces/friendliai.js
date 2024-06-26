/**
 * @file src/interfaces/friendliai.js
 * @class Friendli
 * @description Wrapper class for the FriendliAI API.
 * @param {string} apiKey - The API key for the FriendliAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { friendliApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class FriendliAI extends BaseInterface {
  constructor(apiKey) {
    super('friendliai', apiKey || friendliApiKey, config['friendliai'].url);
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = FriendliAI;
