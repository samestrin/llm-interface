/**
 * @file /src/utils/llmInterface.js
 * @description Build the base LLMInterface class
 */

const { getConfig } = require('./configManager.js');

const config = getConfig();

const modules = Object.keys(config).reduce((acc, key) => {
  acc[key] = `../interfaces/${key}`;
  return acc;
}, {});

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

module.exports = { LLMInterface };
