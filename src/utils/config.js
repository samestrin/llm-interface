/**
 * @file test/utils/config.js
 * @description Utility functions for working with config variables
 */

const {
  getConfig,
  loadProviderConfig,
  updateConfig,
} = require('./configManager.js');
const { listOfActiveProviders } = require('../config/providers.js');
const log = require('loglevel');

/**
 * Sets the API key for a specified interface or multiple interfaces.
 *
 * @param {string|object} interfaceNames - The name of the interface (string) or an object containing interface names as keys and API keys as values.
 * @param {string} [apiKey] - The API key to set (only required when interfaceNames is a string).
 * @returns {boolean} - Returns true if the update was successful, otherwise false.
 */
function setApiKey(interfaceNames, apiKey) {
  log.log(`setApiKey('${interfaceNames}', '${apiKey}')`);
  if (!interfaceNames) {
    return false;
  }

  if (typeof interfaceNames === 'string') {
    loadProviderConfig(interfaceNames);
    const config = getConfig();

    if (!config[interfaceNames] || !apiKey) {
      return false;
    }

    config[interfaceNames].apiKey = apiKey;

    updateConfig(interfaceNames, config[interfaceNames]);
    loadProviderConfig(interfaceNames);
  } else if (typeof interfaceNames === 'object') {
    for (const [interfaceName, keyValue] of Object.entries(interfaceNames)) {
      loadProviderConfig(interfaceNames);
      const config = getConfig();

      if (!config[interfaceName]) {
        continue; // Skip if the interface name is invalid
      }

      config[interfaceName].apiKey = keyValue;
      updateConfig(interfaceName, config[interfaceName]);
    }
  } else {
    // Invalid input type
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
  loadProviderConfig(interfaceName);
  const config = getConfig();

  if (
    !interfaceName ||
    !config[interfaceName] ||
    !config[interfaceName].model ||
    !config[interfaceName].model[alias]
  ) {
    return false;
  }

  config[interfaceName].model[alias] = name;
  updateConfig(interfaceName, config[interfaceName]); // Ensure the updated config is saved

  return true;
}

/**
 * Set embeddings model alias values
 *
 * @param {string} interfaceName - The name of the interface.
 * @param {string} alias - The model alias to update (e.g., "default", "large", "small").
 * @param {string} name - The new model name to set.
 * @param {number} [tokens=null] - The optional token limit for the new model.
 * @returns {boolean} - Returns true if the update was successful, otherwise false.
 */
function setEmbeddingsModelAlias(interfaceName, alias, name, tokens = null) {
  loadProviderConfig(interfaceName);
  const config = getConfig();

  if (
    !interfaceName ||
    !config[interfaceName] ||
    !config[interfaceName].embeddings ||
    !config[interfaceName].embeddings[alias]
  ) {
    return false;
  }

  config[interfaceName].embeddings[alias] = name;
  updateConfig(interfaceName, config[interfaceName]); // Ensure the updated config is saved

  return true;
}

/**
 * Retrieves a configuration value for a specified model and key.
 *
 * @param {string} modelName - The name of the interface (e.g., "openai").
 * @param {string} key - The configuration key (e.g., "url", "model.default").
 * @returns {any|boolean} - The configuration value if it exists, otherwise false.
 */
function getInterfaceConfigValue(interfaceName, key, passThrough = false) {
  loadProviderConfig(interfaceName);
  const config = getConfig();

  const interfaceConfig = config[interfaceName];

  if (!interfaceConfig) {
    if (passThrough) {
      return key;
    } else {
      return false;
    }
  }

  const keys = key.split('.');
  let result = interfaceConfig;

  for (const k of keys) {
    if (result[k] === undefined) {
      //console.error(`Key '${k}' not found in`, result);

      if (passThrough) {
        return key;
      } else {
        return false;
      }
    }

    result = result[k];
  }

  if (typeof result === 'string' || typeof result === 'boolean') {
    return result;
  } else {
    if (passThrough) {
      return key;
    } else {
      return false;
    }
  }
}

/**
 * Retrieves an array of all model names from the configuration object.
 *
 * @returns {string[]} - An array of model names.
 */
function getAllModelNames() {
  return listOfActiveProviders.sort();
}

/**
 * Get the model name based on the provided alias.
 *
 * @param {string} interfaceName - The name of the interfaceName.
 * @param {string} model - The alias or name of the model.
 * @returns {string} The model name.
 */
function getModelByAlias(interfaceName, model = 'default') {
  const key = model.startsWith('model.') ? model : `model.${model}`;
  const alias = getInterfaceConfigValue(interfaceName, key, true);
  if (alias === key) {
    return model;
  } else {
    return alias;
  }
}

/**
 * Get the embedding model name based on the provided alias.
 *
 * @param {string} interfaceName - The name of the interfaceName.
 * @param {string} model - The alias or name of the model.
 * @returns {string} The model name.
 */
function getEmbeddingsModelByAlias(interfaceName, model = 'default') {
  const key = model.startsWith('embeddings.') ? model : `embeddings.${model}`;
  const alias = getInterfaceConfigValue(interfaceName, key, true);
  if (alias === key) {
    return model;
  } else {
    return alias;
  }
}

module.exports = {
  getModelByAlias,
  getEmbeddingsModelByAlias,
  getInterfaceConfigValue,
  getAllModelNames,
  setApiKey,
  setModelAlias,
  setEmbeddingsModelAlias,
};
