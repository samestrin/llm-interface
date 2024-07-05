/**
 * @file test/utils/config.js
 * @description Utility functions for working with config variables
 */

const { getConfig, updateConfig } = require('./configManager.js');
const { CacheManager } = require('./cacheManager.js');
const config = getConfig();
let cacheInstance = [];
/**
 * Sets the API key for a specified interface or multiple interfaces.
 *
 * @param {string|object} interfaceNames - The name of the interface (string) or an object containing interface names as keys and API keys as values.
 * @param {string} [apiKey] - The API key to set (only required when interfaceNames is a string).
 * @returns {boolean} - Returns true if the update was successful, otherwise false.
 */
function setApiKey(interfaceNames, apiKey) {
  if (!interfaceNames) {
    return false;
  }

  if (typeof interfaceNames === 'string') {
    if (!config[interfaceNames] || !apiKey) {
      return false;
    }

    config[interfaceNames].apiKey = apiKey;
  } else if (typeof interfaceNames === 'object') {
    for (const [interfaceName, keyValue] of Object.entries(interfaceNames)) {
      if (!config[interfaceName]) {
        continue; // Skip if the interface name is invalid
      }

      config[interfaceName].apiKey = keyValue;
    }
  } else {
    // Invalid input type
    return false;
  }

  try {
    return updateConfig(config);
  } catch (error) {
    console.error('Error updating config:', error);
    return false;
  }
}

/**
 * Set model alias values
 *
 * @param {string} interfaceName - The name of the interface.
 * @param {string} alias - The model alias to update (e.g., "default", "large", "small").
 * @param {string} name - The new model name to set.
 * @param {number} [tokens=null] - The optional token limit for the new model.
 * @returns {boolean} - Returns true if the update was successful, otherwise false.
 */
function setModelAlias(interfaceName, alias, name, tokens = null) {
  if (
    !interfaceName ||
    !config[interfaceName] ||
    !config[interfaceName].model ||
    !config[interfaceName].model[alias]
  ) {
    return false;
  }

  const model = { name };
  if (tokens !== null) {
    model.tokens = tokens;
  }

  config[interfaceName].model[alias] = model;
  updateConfig(config); // Ensure the updated config is saved
  return true;
}

/**
 * Retrieves a configuration value for a specified model and key.
 *
 * @param {string} modelName - The name of the model (e.g., "openai").
 * @param {string} key - The configuration key (e.g., "url", "model.default").
 * @returns {any|boolean} - The configuration value if it exists, otherwise false.
 */
function getModelConfigValue(modelName, key) {
  const modelConfig = config[modelName];

  if (!modelConfig) {
    return false;
  }

  let result;

  switch (key) {
    case 'url':
      result = modelConfig.url !== undefined ? modelConfig.url : false;
      break;
    case 'apiKey':
      result = modelConfig.apiKey !== undefined ? modelConfig.apiKey : false;
      break;
    case 'model.default':
      result =
        modelConfig.model && modelConfig.model.default !== undefined
          ? modelConfig.model.default
          : false;
      break;
    case 'model.large':
      result =
        modelConfig.model && modelConfig.model.large !== undefined
          ? modelConfig.model.large
          : false;
      break;
    case 'model.small':
      result =
        modelConfig.model && modelConfig.model.small !== undefined
          ? modelConfig.model.small
          : false;
      break;
    default:
      result = false;
  }

  return result;
}

/**
 * Retrieves an array of all model names from the configuration object.
 *
 * @returns {string[]} - An array of model names.
 */
function getAllModelNames() {
  return Object.keys(config).sort();
}

/**
 * Get the model name based on the provided alias.
 *
 * @param {string} interfaceName - The name of the interfaceName.
 * @param {string} model - The alias or name of the model.
 * @returns {string} The model name.
 */
function getModelByAlias(interfaceName, model) {
  if (model === undefined || model === null || model === '') {
    model = 'default';
  }
  if (
    config[interfaceName] &&
    config[interfaceName].model &&
    config[interfaceName].model[model] &&
    config[interfaceName].model[model].name
  ) {
    return config[interfaceName].model[model].name;
  }

  return model;
}

function configureCache(cacheConfig = {}) {
  const cacheType = cacheConfig.cache || 'simple-cache';
  if (cacheInstance[cacheType]) return cacheInstance[cacheType];

  // Instantiate CacheManager with appropriate configuration
  if (cacheConfig.cache && cacheConfig.config) {
    cacheInstance[cacheType] = new CacheManager({
      cacheType,
      cacheOptions: cacheConfig.config,
    });
  } else if (cacheConfig.path) {
    cacheInstance[cacheType] = new CacheManager({
      cacheType,
      cacheDir: cacheConfig.path,
    });
  } else {
    cacheInstance[cacheType] = new CacheManager({
      cacheType,
    });
  }

  cacheInstance[cacheType].loadCacheInstance();
  if (this) this.cacheManagerInstance = cacheInstance[cacheType];

  return cacheInstance[cacheType];
}

module.exports = {
  getModelByAlias,
  getModelConfigValue,
  getAllModelNames,
  setApiKey,
  setModelAlias,
  configureCache,
};
