/**
 * @file index.js
 * @description Entry point for the LLM interface module, dynamically loading LLMInterface for different LLM providers.
 */

const modules = {
  openai: "./openai",
  anthropic: "./anthropic",
  gemini: "./gemini",
  llamacpp: "./llamacpp",
  reka: "./reka",
  groq: "./groq",
  goose: "./goose",
  cohere: "./cohere",
  mistral: "./mistral",
  huggingface: "./huggingface",
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

/**
 * Returns a message object with the provided message and an optional system message.
 *
 * @param {string} message - The user's message.
 * @param {string} [systemMessage="You are a helpful assistant."] - The system's message.
 * @returns {Object} The message object.
 */
LLMInterface.returnMessageObject = function (
  message,
  systemMessage = "You are a helpful assistant."
) {
  return {
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: message,
      },
    ],
  };
};

const handlers = LLMInterface;
module.exports = { LLMInterface, handlers };
