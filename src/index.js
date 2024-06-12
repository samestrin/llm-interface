/**
 * @file index.js
 * @description Entry point for the LLM interface module, dynamically loading handlers for different LLM providers.
 */

const modules = {
  openai: "./openai",
  anthropic: "./anthropic",
  gemini: "./gemini",
  llamacpp: "./llamacpp",
  reka: "./reka",
  groq: "./groq",
};

const handlers = {};
Object.keys(modules).forEach((key) => {
  Object.defineProperty(handlers, key, {
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

module.exports = handlers;
