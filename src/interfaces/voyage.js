/**
 * @file src/interfaces/voyage.js
 * @class Voyage
 * @description Wrapper class for the Voyage API.
 * @param {string} apiKey - The API key for the Voyage API.
 */

const BaseInterface = require('./baseInterface.js');
const { voyageApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { SendMessageError } = require('../utils/errors.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'voyage';

loadProviderConfig(interfaceName);
const config = getConfig();

class Voyage extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || voyageApiKey, config[interfaceName].url);
  }

  sendMessage(message, options = {}, interfaceOptions = {}) {
    throw new SendMessageError(`This interface does not support this method.`);
  }
}

module.exports = Voyage;
