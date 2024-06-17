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

const handlers = LLMInterface;
module.exports = { LLMInterface, handlers };
