/**
 * @file index.js
 * @description Entry point for the LLM interface module, dynamically loading LLMInterface for different LLM providers.
 */

const modules = {
  openai: './interfaces/openai',
  anthropic: './interfaces/anthropic',
  gemini: './interfaces/gemini',
  llamacpp: './interfaces/llamacpp',
  reka: './interfaces/reka',
  groq: './interfaces/groq',
  goose: './interfaces/goose',
  cohere: './interfaces/cohere',
  mistral: './interfaces/mistral',
  huggingface: './interfaces/huggingface',
  ai21: './interfaces/ai21',
  perplexity: './interfaces/perplexity',
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

const handlers = LLMInterface; // alias to keep backward compatibility

const LLMInstances = {}; // Persistent LLM instances

/**
 * Sends a message to a specified LLM module and returns the response.
 * Reuses existing LLM instances for the given module and API key to optimize resource usage.
 *
 * @param {string} module - The name of the LLM module (e.g., "openai").
 * @param {string} apiKey - The API key for the LLM.
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
    throw new Error(`Module ${module} is not supported.`);
  }

  if (!apiKey) {
    throw new Error(`API key for ${module} is not provided.`);
  }

  if (!LLMInstances[module]) {
    LLMInstances[module] = {};
  }

  if (!LLMInstances[module][apiKey]) {
    LLMInstances[module][apiKey] = new LLMInterface[module](apiKey);
  }

  const llmInstance = LLMInstances[module][apiKey];
  try {
    const response = await llmInstance.sendMessage(
      message,
      options,
      interfaceOptions,
    );
    return response;
  } catch (error) {
    throw new Error(`LLMInterfaceSendMessage: ${error}`);
  }
}

module.exports = { LLMInterface, LLMInterfaceSendMessage, handlers };
