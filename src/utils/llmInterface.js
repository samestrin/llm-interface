/**
 * @file /src/utils/llmInterface.js
 * @description Build the base LLMInterface used providers.js
 */

const { listOfActiveProviders } = require('../config/providers.js');

const interfaces = {};

for (const interfaceName of listOfActiveProviders) {
  interfaces[interfaceName] = `../interfaces/${interfaceName}`;
}

/**
 * Dynamically imports and initializes LLM interfaces based on the list of active providers.
 * @namespace
 */
const LLMInterface = {};
Object.keys(interfaces).forEach((key) => {
  Object.defineProperty(LLMInterface, key, {
    get: function () {
      if (!this[`_${key}`]) {
        this[`_${key}`] = require(interfaces[key]);
      }
      return this[`_${key}`];
    },
    enumerable: true,
    configurable: true,
  });
});

module.exports = { LLMInterface };
