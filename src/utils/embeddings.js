/**
 * @file src/utils/embeddings.js
 * @description Message related functions both non streamed and streamed. Includes wrapper that don't require the API key each time.
 */

const {
  updateConfig,
  getConfig,
  loadProviderConfig,
} = require('./configManager.js');

const { LLMInterface } = require('./llmInterface.js');
const { createCacheKey } = require('./utils.js');

const config = getConfig();

const LLMInstances = {}; // Persistent LLM instances

const { EmbeddingsError } = require('./errors.js');
const { retryWithBackoff } = require('./retryWithBackoff.js');

/**
 * Generates embeddings using a specified LLM interface.
 * @param {string} interfaceName - The name of the LLM interface to use.
 * @param {string|Array<string>} apiKey - The API key for the LLM interface. Can be a string or an array containing the API key and user ID.
 * @param {string} embeddingString - The string to generate embeddings for.
 * @param {object} [options={}] - Additional options for the embedding generation.
 * @param {object|number} [interfaceOptions={}] - Options specific to the LLM interface. If a number, it represents the cache timeout in seconds.
 * @param {string} [defaultProvider] - The default provider to use if the specified interface doesn't support embeddings.
 * @throws {EmbeddingsError} Throws an error if the input parameters are invalid or if the LLM interface is unsupported.
 * @throws {EmbeddingsError} Throws an error if the embedding generation fails.
 * @returns {Promise<Object>} A promise that resolves to the embedding response, potentially including cache information.
 */
async function LLMInterfaceEmbeddings(
  interfaceName,
  apiKey,
  embeddingString,
  options = {},
  interfaceOptions = {},
  defaultProvider,
) {
  if (typeof embeddingString !== 'string' || embeddingString === '') {
    throw new EmbeddingsError(
      `The string 'embeddingString' value passed was invalid.`,
    );
  }

  // check if the provider offers embeddings, if not, switch to the default provider
  if (
    !config[interfaceName].embeddingUrl &&
    config[defaultProvider] &&
    config[defaultProvider].apiKey
  ) {
    interfaceName = defaultProvider;
    apiKey = config[interfaceName].apiKey;
  }

  if (
    !config[interfaceName].embeddingUrl &&
    !config[interfaceName].embeddings
  ) {
    throw new EmbeddingsError(
      `LLM interfaceName does not support embeddings: ${interfaceName}`,
    );
  }

  if (!LLMInterface[interfaceName]) {
    throw new EmbeddingsError(
      `Unsupported LLM interfaceName: ${interfaceName}`,
    );
  }

  if (!apiKey) {
    throw new EmbeddingsError(
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
    embeddingString,
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

  const embeddingsWithRetries = async () => {
    const llmInstance = LLMInstances[interfaceName][apiKey];
    return await llmInstance.embeddings(
      embeddingString,
      options,
      interfaceOptions,
    );
  };

  let response = {};

  try {
    response = await retryWithBackoff(
      embeddingsWithRetries,
      interfaceOptions,
      'EmbeddingsError',
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
 * Fetches embeddings from an LLM interface with the specified configuration.
 * @param {string|Array} interfaceName - The name of the interface or an array where the first element is the interface name and the second element is the API key.
 * @param {string} message - The message to be processed for embeddings.
 * @param {object} [options={}] - Optional parameters for the embeddings.
 * @param {object} [interfaceOptions={}] - Additional options specific to the interface.
 * @param {string} [defaultProvider='voyage'] - The default provider for embeddings.
 * @throws {EmbeddingsError} Throws an error if the config or updateConfig is not defined or if the API key is not found.
 * @returns {Promise<any>} The embeddings result from the specified interface.
 */

async function LLMInterfaceEmbeddingsWithConfig(
  interfaceName,
  message,
  options = {},
  interfaceOptions = {},
  defaultProvider = 'voyage',
) {
  // Ensure config and updateConfig are defined
  if (typeof config === 'undefined' || typeof updateConfig === 'undefined') {
    throw new EmbeddingsError('Config or updateConfig is not defined.');
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
    throw new EmbeddingsError(
      `API key not found for LLM interfaceName: ${interfaceName}`,
    );
  }

  // Check for interfaceOptions.embeddingsDefaultProvider
  if (
    interfaceOptions.embeddingsDefaultProvider &&
    interfaceOptions.embeddingsDefaultProvider !== defaultProvider
  ) {
    defaultProvider = interfaceOptions.embeddingsDefaultProvider;
  }

  return LLMInterfaceEmbeddings(
    interfaceName,
    apiKey,
    message,
    options,
    interfaceOptions,
    defaultProvider,
  );
}

module.exports = {
  LLMInterfaceEmbeddings,
  LLMInterfaceEmbeddingsWithConfig,
};
