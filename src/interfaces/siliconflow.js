/**
 * @file src/interfaces/siliconflow.js
 * @class SiliconFlow
 * @description Wrapper class for the SiliconFlow API.
 * @param {string} apiKey - The API key for the SiliconFlow API.
 */

const BaseInterface = require('./baseInterface.js');
const { siliconflowApiKey } = require('../config/config.js');
const { getSimpleMessageObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const config = getConfig();

class SiliconFlow extends BaseInterface {
  constructor(apiKey) {
    super(
      'siliconflow',
      apiKey || siliconflowApiKey,
      config['siliconflow'].url,
    );
  }

  createMessageObject(message) {
    return typeof message === 'string'
      ? getSimpleMessageObject(message)
      : message;
  }
}

module.exports = SiliconFlow;
