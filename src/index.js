/**
 * @file /src/index.js
 * @description Entry point for the LLM interface module, dynamically loading LLMInterface for different LLM providers.
 */

const {
  getAllModelNames,
  setApiKey,
  getModelConfigValue,
} = require('./utils/config.js');
const { getConfig } = require('./utils/configManager.js');
const {
  LLMInterfaceSendMessage,
  LLMInterfaceStreamMessage,
  LLMInterfaceSendMessageWithConfig,
  LLMInterfaceStreamMessageWithConfig,
} = require('./utils/message.js');

const config = getConfig();

const modules = Object.keys(config).reduce((acc, key) => {
  acc[key] = `./interfaces/${key}`;
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

// LLMInterface get functions
LLMInterface.getAllModelNames = getAllModelNames;
LLMInterface.getModelConfigValue = getModelConfigValue;

// LLMInterface set function
LLMInterface.setApiKey = setApiKey;

// LLMInterface chat functions
LLMInterface.streamMessage = LLMInterfaceStreamMessageWithConfig;
LLMInterface.sendMessage = LLMInterfaceSendMessageWithConfig;

module.exports = {
  LLMInterface,
  LLMInterfaceSendMessage,
  LLMInterfaceStreamMessage,
  config,
};
