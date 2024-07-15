/**
 * @file /src/index.js
 * @description Entry point for the LLM interface module, dynamically loading LLMInterface for different LLM providers.
 */

const { LLMInterface } = require('./utils/llmInterface.js');
const {
  LLMInterfaceSendMessage,
  LLMInterfaceStreamMessage,
  LLMInterfaceSendMessageWithConfig,
  LLMInterfaceStreamMessageWithConfig,
} = require('./utils/message.js');
const {
  LLMInterfaceEmbeddings,
  LLMInterfaceEmbeddingsWithConfig,
} = require('./utils/embeddings.js');
const {
  getAllModelNames,
  setApiKey,
  getInterfaceConfigValue,
  setModelAlias,
  setEmbeddingsModelAlias,
  getModelByAlias,
  getEmbeddingsModelByAlias,
} = require('./utils/config.js');
const { flushCache, configureCache } = require('./utils/cache.js');

// LLMInterface get functions
LLMInterface.getAllModelNames = getAllModelNames;
LLMInterface.getInterfaceConfigValue = getInterfaceConfigValue;
LLMInterface.getModelByAlias = getModelByAlias;
LLMInterface.getEmbeddingsModelByAlias = getEmbeddingsModelByAlias;

// LLMInterface set functions
LLMInterface.setApiKey = setApiKey;
LLMInterface.setModelAlias = setModelAlias;
LLMInterface.setEmbeddingsModelAlias = setEmbeddingsModelAlias;

// LLMInterface chat functions
LLMInterface.streamMessage = LLMInterfaceStreamMessageWithConfig;
LLMInterface.sendMessage = LLMInterfaceSendMessageWithConfig;

// Alias to match OpenAI
LLMInterface.chat = {};
LLMInterface.chat.completions = {};
LLMInterface.chat.completions.create = LLMInterfaceSendMessageWithConfig;

// LLMInterface embedding function
LLMInterface.embeddings = LLMInterfaceEmbeddingsWithConfig;

// LLMInterface cache functions
LLMInterface.configureCache = configureCache;
LLMInterface.flushCache = flushCache;

module.exports = {
  LLMInterface,
  LLMInterfaceSendMessage,
  LLMInterfaceStreamMessage,
  LLMInterfaceEmbeddings,
};
