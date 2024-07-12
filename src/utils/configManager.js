/**
 * @file /utils/configManager.js
 * @description Manages the configuration for the LLM interface module.
 */

const fs = require('fs');
const path = require('path');
const providersDir = path.join(__dirname, '..', 'config', 'providers');
const log = require('loglevel');

//log.setLevel('trace');

/**
 * The main configuration object that stores configurations for all providers.
 */
const config = {};

/**
 * Loads the configuration for a given provider or multiple providers.
 *
 * @param {string|string[]|Object.<string, string>} providerName - The name of the provider,
 * an array of provider names, or an object with provider names as keys and their corresponding API keys as values.
 * @returns {Object|undefined} The loaded configuration(s). If a single provider is loaded, returns its config.
 * If multiple providers are loaded, returns an object with the providers' configs. If no config is found, returns undefined.
 */
function loadProviderConfig(providerName) {
  if (config && config[providerName] && config[providerName].url) {
    return config[providerName];
  }

  /**
   * Synchronously loads the configuration for a single provider.
   *
   * @param {string} name - The name of the provider.
   * @returns {object|null} The provider configuration object or null if the configuration does not exist.
   */
  function loadSingleProviderConfig(name) {
    if (config && config[name] && config[name].url) {
      return config[name];
    }

    const filePath = path.join(providersDir, `${name}.json`);
    if (fs.existsSync(filePath)) {
      const providerConfig = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      config[name] = providerConfig;
      return config[name];
    }

    return null;
  }

  // Handle different types of input
  if (typeof providerName === 'string') {
    return loadSingleProviderConfig(providerName);
  } else if (Array.isArray(providerName)) {
    return providerName.reduce((acc, name) => {
      acc[name] = loadSingleProviderConfig(name);
      return acc;
    }, {});
  } else if (typeof providerName === 'object' && providerName !== null) {
    return Object.keys(providerName).reduce((acc, name) => {
      acc[name] = loadSingleProviderConfig(name);
      return acc;
    }, {});
  }
}

/**
 * Gets the configuration for a specific provider.
 * @param {string} providerName - The name of the provider.
 * @returns {Object} The configuration object for the provider.
 */
function getProviderConfig(providerName) {
  if (!config[providerName]) {
    loadProviderConfig(providerName);
  }
  return config[providerName];
}

/**
 * Updates the configuration for a specific provider in memory.
 * @param {string} providerName - The name of the provider.
 * @param {Object} newConfig - The new configuration object for the provider.
 */
function updateConfig(providerName, newConfig) {
  config[providerName] = newConfig;
}

/**
 * Gets the configurations for all loaded providers.
 * @returns {Object} An object with configurations for all loaded providers.
 */
function getConfig() {
  return config;
}

module.exports = {
  getConfig,
  updateConfig,
  getProviderConfig,
  loadProviderConfig,
};
