/**
 * @file /utils/configManager.js
 * @description Manages the configuration for the LLM interface module.
 */

const config = require('../config/llmProviders.json');

module.exports = {
  getConfig: () => config,
  updateConfig: (newConfig) => {
    Object.assign(config, newConfig);
  },
};
