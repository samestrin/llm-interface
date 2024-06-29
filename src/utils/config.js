/**
 * @file test/utils/config.js
 * @description Utility functions for working with config variables
 */

const { getConfig, updateConfig } = require('./configManager.js');
const config = getConfig();

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
 * Adjusts model alias values
 *
 * @param {string} interfaceName - The name of the interface.
 * @param {string} alias - The model alias to update (e.g., "default", "large", "small").
 * @param {string} name - The new model name to set.
 * @param {number} [tokens=null] - The optional token limit for the new model.
 * @returns {boolean} - Returns true if the update was successful, otherwise false.
 */
function adjustModelAlias(interfaceName, alias, name, tokens = null) {
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
 * @param {string} provider - The name of the provider.
 * @param {string} model - The alias or name of the model.
 * @returns {string} The model name.
 */
function getModelByAlias(provider, model) {
  if (model === undefined || model === null || model === '') {
    model = 'default';
  }
  if (
    config[provider] &&
    config[provider].model &&
    config[provider].model[model] &&
    config[provider].model[model].name
  ) {
    return config[provider].model[model].name;
  }

  return model;
}

module.exports = {
  adjustModelAlias,
  getModelByAlias,
  getModelConfigValue,
  getAllModelNames,
  setApiKey,
};
