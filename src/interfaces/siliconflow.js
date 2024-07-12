/**
 * @file src/interfaces/siliconflow.js
 * @class SiliconFlow
 * @description Wrapper class for the SiliconFlow API.
 * @param {string} apiKey - The API key for the SiliconFlow API.
 */

const BaseInterface = require('./baseInterface.js');
const { siliconflowApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'siliconflow';

loadProviderConfig(interfaceName);
const config = getConfig();

class SiliconFlow extends BaseInterface {
  constructor(apiKey) {
    super(
      interfaceName,
      apiKey || siliconflowApiKey,
      config[interfaceName].url,
    );
  }
}

module.exports = SiliconFlow;
