/**
 * @file src/interfaces/zhipuai.js
 * @class ZhipuAI
 * @description Wrapper class for the ZhipuAI API.
 * @param {string} apiKey - The API key for the ZhipuAI API.
 */

const BaseInterface = require('./baseInterface.js');
const { zhipuaiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'zhipuai';

loadProviderConfig(interfaceName);
const config = getConfig();

class ZhipuAI extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || zhipuaiApiKey, config[interfaceName].url);
  }
}

module.exports = ZhipuAI;
