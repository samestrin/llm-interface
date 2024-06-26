/**
 * @file src/utils/message.js
 * @description Message related functions both non streamed and streamed. Includes wrapper that don't require the API key each time.
 */

const { LLMInterface } = require('./llmInterface.js');
const { getConfig } = require('./configManager.js');

const config = getConfig();

const LLMInstances = {}; // Persistent LLM instances

/**
 * Sends a message to a specified LLM module and returns the response.
 * Reuses existing LLM instances for the given module and API key to optimize resource usage.
 *
 * @param {string} module - The name of the LLM module (e.g., "openai").
 * @param {string|array} apiKey - The API key for the LLM or an array containing the API key and user ID.
 * @param {string} message - The message to send to the LLM.
 * @param {object} [options={}] - Additional options for the message.
 * @param {object} [interfaceOptions={}] - Options for initializing the interface.
 * @returns {Promise<any>} - The response from the LLM.
 * @throws {Error} - Throws an error if the module is not supported or if the API key is not provided.
 */
async function LLMInterfaceSendMessage(
  module,
  apiKey,
  message,
  options = {},
  interfaceOptions = {},
) {
  if (options.stream) {
    return await LLMInterfaceStreamMessage(module, apiKey, message, options);
  }

  if (!LLMInterface[module]) {
    throw new Error(`Unsupported LLM module: ${module}`);
  }

  if (!apiKey) {
    throw new Error(`Missing API key for LLM module: ${module}`);
  }

  let userId;
  if (Array.isArray(apiKey)) {
    [apiKey, userId] = apiKey;
  }

  LLMInstances[module] = LLMInstances[module] || {};

  if (!LLMInstances[module][apiKey]) {
    LLMInstances[module][apiKey] = userId
      ? new LLMInterface[module](apiKey, userId)
      : new LLMInterface[module](apiKey);
  }
  try {
    const llmInstance = LLMInstances[module][apiKey];
    return await llmInstance.sendMessage(message, options, interfaceOptions);
  } catch (error) {
    throw new Error(
      `Failed to send message using LLM module ${module}: ${error.message}`,
    );
  }
}

/**
 * Sends a message to a specified LLM module and returns the response.
 * Reuses existing LLM instances for the given module and API key to optimize resource usage.
 *
 * @param {string} module - The name of the LLM module (e.g., "openai").
 * @param {string|array} apiKey - The API key for the LLM or an array containing the API key and user ID.
 * @param {string} message - The message to send to the LLM.
 * @param {object} [options={}] - Additional options for the message.
 * @returns {Promise<any>} - The response from the LLM.
 * @throws {Error} - Throws an error if the module is not supported or if the API key is not provided.
 */
async function LLMInterfaceStreamMessage(
  module,
  apiKey,
  message,
  options = {},
) {
  if (!LLMInterface[module]) {
    throw new Error(`Unsupported LLM module: ${module}`);
  }

  if (!apiKey) {
    throw new Error(`Missing API key for LLM module: ${module}`);
  }

  let userId;
  if (Array.isArray(apiKey)) {
    [apiKey, userId] = apiKey;
  }

  LLMInstances[module] = LLMInstances[module] || {};

  if (!LLMInstances[module][apiKey]) {
    LLMInstances[module][apiKey] = userId
      ? new LLMInterface[module](apiKey, userId)
      : new LLMInterface[module](apiKey);
  }

  try {
    const llmInstance = LLMInstances[module][apiKey];
    return await llmInstance.streamMessage(message, options);
  } catch (error) {
    throw new Error(
      `Failed to stream message using LLM module ${module}: ${error.message}`,
    );
  }
}

/**
 * Wrapper function for LLMInterfaceSendMessage that looks up the API key in the config.
 *
 * @param {string} module - The name of the LLM module (e.g., "openai").
 * @param {string} message - The message to send to the LLM.
 * @param {object} [options={}] - Additional options for the message.
 * @param {object} [interfaceOptions={}] - Options for initializing the interface.
 * @returns {Promise<any>} - The response from the LLM.
 * @throws {Error} - Throws an error if the module is not supported or if the API key is not found.
 */
async function LLMInterfaceSendMessageWithConfig(
  module,
  message,
  options = {},
  interfaceOptions = {},
) {
  const apiKey = config[module]?.apiKey;

  if (!apiKey) {
    throw new Error(`API key not found for LLM module: ${module}`);
  }

  return LLMInterfaceSendMessage(
    module,
    apiKey,
    message,
    options,
    interfaceOptions,
  );
}

/**
 * Wrapper function for LLMInterfaceStreamMessage that looks up the API key in the config.
 *
 * @param {string} module - The name of the LLM module (e.g., "openai").
 * @param {string} message - The message to send to the LLM.
 * @param {object} [options={}] - Additional options for the message.
 * @returns {Promise<any>} - The response from the LLM.
 * @throws {Error} - Throws an error if the module is not supported or if the API key is not found.
 */
async function LLMInterfaceStreamMessageWithConfig(
  module,
  message,
  options = {},
) {
  const apiKey = config[module]?.apiKey;

  if (!apiKey) {
    throw new Error(`API key not found for LLM module: ${module}`);
  }

  return LLMInterfaceStreamMessage(module, apiKey, message, options);
}

module.exports = {
  LLMInterface,
  LLMInterfaceSendMessage,
  LLMInterfaceStreamMessage,
  LLMInterfaceSendMessageWithConfig,
  LLMInterfaceStreamMessageWithConfig,
};
