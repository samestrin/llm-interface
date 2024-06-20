/**
 * @file index.js
 * @description Entry point for the LLM interface module, dynamically loading LLMInterface for different LLM providers.
 */

const modules = {
  ai21: './interfaces/ai21',
  anthropic: './interfaces/anthropic',
  azureai: './interfaces/azureai',
  cloudflareai: './interfaces/cloudflareai',
  cohere: './interfaces/cohere',
  fireworksai: './interfaces/fireworksai',
  friendliai: './interfaces/friendliai',
  gemini: './interfaces/gemini',
  gooseai: './interfaces/gooseai',
  groq: './interfaces/groq',
  huggingface: './interfaces/huggingface',
  llamacpp: './interfaces/llamacpp',
  mistralai: './interfaces/mistralai',
  openai: './interfaces/openai',
  perplexity: './interfaces/perplexity',
  rekaai: './interfaces/rekaai',
  taskingai: './interfaces/taskingai',
  telnyx: './interfaces/telnyx',
  togetherai: './interfaces/togetherai',
};

const LLMInterface = {};
Object.keys(modules).forEach((key) => {
  Object.defineProperty(LLMInterface, key, {
    get: function () {
      if (!this[`_${key}`]) {
        this[`_${key}`] = require(modules[key]);
      }
      return this[`_${key}`];
    },
    enumerable: true,
    configurable: true,
  });
});

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

  const llmInstance = LLMInstances[module][apiKey];

  try {
    return await llmInstance.sendMessage(message, options, interfaceOptions);
  } catch (error) {
    throw new Error(
      `Failed to send message using LLM module ${module}: ${error.message}`,
    );
  }
}

module.exports = { LLMInterface, LLMInterfaceSendMessage };
