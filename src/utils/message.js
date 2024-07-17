/**
 * @file src/utils/message.js
 * @description Message related functions both non streamed and streamed. Includes wrapper that don't require the API key each time.
 */

const {
  updateConfig,
  getConfig,
  loadProviderConfig,
} = require('./configManager.js');
const { SendMessageError, StreamError } = require('./errors.js');
const { LLMInterface } = require('./llmInterface.js');
const { createCacheKey } = require('./utils.js');
const log = require('loglevel');

const config = getConfig();

const LLMInstances = {}; // Persistent LLM instances

const { retryWithBackoff } = require('./retryWithBackoff.js');
/**
 * Sends a message to a specified LLM interfaceName and returns the response.
 * Reuses existing LLM instances for the given interfaceName and API key to optimize resource usage.
 *
 * @param {string} interfaceName - The name of the LLM interfaceName (e.g., "openai").
 * @param {string|array} apiKey - The API key for the LLM or an array containing the API key and user ID.
 * @param {string} message - The message to send to the LLM.
 * @param {object} [options={}] - Additional options for the message.
 * @param {object} [interfaceOptions={}] - Options for initializing the interface.
 * @returns {Promise<any>} - The response from the LLM.
 * @throws {SendMessageError} - Throws an error if the interfaceName is not supported or if the API key is not provided.
 */
async function LLMInterfaceSendMessage(
  interfaceName,
  apiKey,
  message,
  options = {},
  interfaceOptions = {},
) {
  if (typeof message === 'string' && message === '') {
    throw new SendMessageError(
      `The string 'message' value passed was invalid.`,
    );
  } else if (message === undefined) {
    throw new SendMessageError(
      `The string 'message' value passed was undefined.`,
    );
  }

  if (options.stream) {
    return await LLMInterfaceStreamMessage(
      interfaceName,
      apiKey,
      message,
      options,
    );
  }

  if (!LLMInterface[interfaceName]) {
    log.log(LLMInterface);
    throw new SendMessageError(
      `Unsupported LLM interfaceName: ${interfaceName}`,
    );
  }

  if (!apiKey) {
    throw new SendMessageError(
      `Missing API key for LLM interfaceName: ${interfaceName}`,
    );
  }

  let userId;
  if (Array.isArray(apiKey)) {
    [apiKey, userId] = apiKey;
  }

  const cacheTimeoutSeconds =
    typeof interfaceOptions === 'number'
      ? interfaceOptions
      : interfaceOptions.cacheTimeoutSeconds;

  const cacheKey = createCacheKey({
    interfaceName,
    apiKey,
    message,
    ...options,
    ...interfaceOptions,
  });

  // return the the response from a singleton if responseMemoryCache is true or from the cache if cacheTimeoutSeconds is set
  if (
    LLMInterface &&
    LLMInterface.cacheManagerInstance &&
    LLMInterface.cacheManagerInstance.cacheType === 'memory-cache'
  ) {
    let cachedResponse = await LLMInterface.cacheManagerInstance.getFromCache(
      cacheKey,
    );

    if (cachedResponse) {
      cachedResponse.cacheType = LLMInterface.cacheManagerInstance.cacheType;
      return cachedResponse;
    }
  } else if (LLMInterface && cacheTimeoutSeconds) {
    // if we don't have a cache manager, set it up with defaults
    if (!LLMInterface.cacheManagerInstance)
      LLMInterface.cacheManagerInstance = LLMInterface.configureCache();

    let cachedResponse = await LLMInterface.cacheManagerInstance.getFromCache(
      cacheKey,
    );

    if (cachedResponse) {
      cachedResponse.cacheType = LLMInterface.cacheManagerInstance.cacheType;
      return cachedResponse;
    }
  }

  LLMInstances[interfaceName] = LLMInstances[interfaceName] || {};

  if (!LLMInstances[interfaceName][apiKey]) {
    LLMInstances[interfaceName][apiKey] = userId
      ? new LLMInterface[interfaceName](apiKey, userId)
      : new LLMInterface[interfaceName](apiKey);
  }

  const sendMessageWithRetries = async () => {
    const llmInstance = LLMInstances[interfaceName][apiKey];
    return await llmInstance.sendMessage(message, options, interfaceOptions);
  };

  let response = {};
  try {
    response = await retryWithBackoff(
      sendMessageWithRetries,
      interfaceOptions,
      'SendMessageError',
    );
  } catch (error) {
    throw error;
  }

  if (LLMInterface && LLMInterface.cacheManagerInstance && response?.results) {
    try {
      const { cacheManagerInstance } = LLMInterface;

      if (cacheManagerInstance.cacheType === 'memory-cache') {
        await cacheManagerInstance.saveToCache(cacheKey, response);
      } else if (cacheTimeoutSeconds) {
        await cacheManagerInstance.saveToCache(
          cacheKey,
          response,
          cacheTimeoutSeconds,
        );
      }
    } catch (error) {
      throw error;
    }
  }

  return response;
}

/**
 * Wrapper function for LLMInterfaceSendMessage that looks up the API key in the config.
 *
 * @param {string} interfaceName - The name of the LLM interfaceName (e.g., "openai").
 * @param {string} message - The message to send to the LLM.
 * @param {object} [options={}] - Additional options for the message.
 * @param {object} [interfaceOptions={}] - Options for initializing the interface.
 * @returns {Promise<any>} - The response from the LLM.
 * @throws {SendMessageError} - Throws an error if the interfaceName is not supported or if the API key is not found.
 */
async function LLMInterfaceSendMessageWithConfig(
  interfaceName,
  message,
  options = {},
  interfaceOptions = {},
) {
  // Ensure config and updateConfig are defined
  if (typeof config === 'undefined' || typeof updateConfig === 'undefined') {
    throw new SendMessageError('Config or updateConfig is not defined.');
  }

  // allow for the API to be passed in-line
  let apiKey = null;
  if (!config[interfaceName]?.apiKey && Array.isArray(interfaceName)) {
    apiKey = interfaceName[1];
    interfaceName = interfaceName[0];
  }

  // ensure the config is loaded for this interface
  if (!config[interfaceName]) {
    loadProviderConfig(interfaceName);
  }

  if (
    config[interfaceName]?.apiKey &&
    (typeof config[interfaceName].apiKey === 'string' ||
      Array.isArray(config[interfaceName].apiKey))
  ) {
    apiKey = config[interfaceName].apiKey;
  }

  // Ensure we have the current interfaceName in the config
  if (
    (!apiKey && config[interfaceName]?.apiKey === undefined) ||
    config[interfaceName]?.apiKey === null
  ) {
    loadProviderConfig(interfaceName);
    if (!apiKey && config[interfaceName]?.apiKey) {
      apiKey = config[interfaceName].apiKey;
    }
  }

  // Register a key update
  if (apiKey && config[interfaceName]?.apiKey !== apiKey) {
    if (config[interfaceName]) {
      config[interfaceName].apiKey = apiKey;
      updateConfig(interfaceName, config[interfaceName]);
    }
  }

  if (!apiKey) {
    throw new SendMessageError(
      `API key not found for LLM interfaceName: ${interfaceName}`,
    );
  }

  // Save the key to the config object

  config[interfaceName].apiKey = apiKey;
  updateConfig(interfaceName, config[interfaceName]);

  return LLMInterfaceSendMessage(
    interfaceName,
    apiKey,
    message,
    options,
    interfaceOptions,
  );
}

/**
 * Sends a message to a specified LLM interfaceName and returns the streamed response.
 * Reuses existing LLM instances for the given interfaceName and API key to optimize resource usage.
 *
 * @param {string} interfaceName - The name of the LLM interfaceName (e.g., "openai").
 * @param {string|array} apiKey - The API key for the LLM or an array containing the API key and user ID.
 * @param {string} message - The message to send to the LLM.
 * @param {object} [options={}] - Additional options for the message.
 * @returns {Promise<any>} - The response from the LLM.
 * @throws {StreamError} - Throws an error if the interfaceName is not supported or if the API key is not provided.
 */
async function LLMInterfaceStreamMessage(
  interfaceName,
  apiKey,
  message,
  options = {},
) {
  if (typeof message === 'string' && message === '') {
    throw new StreamError(`The string 'message' value passed was invalid.`);
  }

  if (!LLMInterface[interfaceName]) {
    throw new StreamError(`Unsupported LLM interfaceName: ${interfaceName}`);
  }

  if (!apiKey) {
    throw new StreamError(
      `Missing API key for LLM interfaceName: ${interfaceName}`,
    );
  }

  let userId;
  if (Array.isArray(apiKey)) {
    [apiKey, userId] = apiKey;
  }

  LLMInstances[interfaceName] = LLMInstances[interfaceName] || {};

  if (!LLMInstances[interfaceName][apiKey]) {
    LLMInstances[interfaceName][apiKey] = userId
      ? new LLMInterface[interfaceName](apiKey, userId)
      : new LLMInterface[interfaceName](apiKey);
  }

  try {
    const llmInstance = LLMInstances[interfaceName][apiKey];
    return await llmInstance.streamMessage(message, options);
  } catch (error) {
    throw new StreamError(
      `Failed to stream message using LLM interfaceName ${interfaceName}: ${error.message}`,
    );
  }
}

/**
 * Wrapper function for LLMInterfaceStreamMessage that looks up the API key in the config.
 *
 * @param {string} interfaceName - The name of the LLM interfaceName (e.g., "openai").
 * @param {string} message - The message to send to the LLM.
 * @param {object} [options={}] - Additional options for the message.
 * @returns {Promise<any>} - The response from the LLM.
 * @throws {StreamError} - Throws an error if the interfaceName is not supported or if the API key is not found.
 */
async function LLMInterfaceStreamMessageWithConfig(
  interfaceName,
  message,
  options = {},
) {
  // Ensure config and updateConfig are defined
  if (typeof config === 'undefined' || typeof updateConfig === 'undefined') {
    throw new StreamError('Config or updateConfig is not defined.');
  }

  // allow for the API to be passed in-line
  let apiKey = null;
  if (!config[interfaceName]?.apiKey && Array.isArray(interfaceName)) {
    apiKey = interfaceName[1];
    interfaceName = interfaceName[0];
  }

  // ensure the config is loaded for this interface
  if (!config[interfaceName]) {
    loadProviderConfig(interfaceName);
  }

  if (
    config[interfaceName]?.apiKey &&
    (typeof config[interfaceName].apiKey === 'string' ||
      Array.isArray(config[interfaceName].apiKey))
  ) {
    apiKey = config[interfaceName].apiKey;
  }

  // Ensure we have the current interfaceName in the config
  if (
    (!apiKey && config[interfaceName]?.apiKey === undefined) ||
    config[interfaceName]?.apiKey === null
  ) {
    loadProviderConfig(interfaceName);
    if (!apiKey && config[interfaceName]?.apiKey) {
      apiKey = config[interfaceName].apiKey;
    }
  }

  // Register a key update
  if (apiKey && config[interfaceName]?.apiKey !== apiKey) {
    if (config[interfaceName]) {
      config[interfaceName].apiKey = apiKey;
      updateConfig(interfaceName, config[interfaceName]);
    }
  }

  if (!apiKey) {
    throw new StreamError(
      `API key not found for LLM interfaceName: ${interfaceName}`,
    );
  }

  return LLMInterfaceStreamMessage(interfaceName, apiKey, message, options);
}

module.exports = {
  LLMInterfaceSendMessage,
  LLMInterfaceSendMessageWithConfig,
  LLMInterfaceStreamMessage,
  LLMInterfaceStreamMessageWithConfig,
};
