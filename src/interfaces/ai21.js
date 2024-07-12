/**
 * @file src/interfaces/ai21.js
 * @class AI21
 * @description Wrapper class for the AI21 API.
 * @param {string} apiKey - The API key for the AI21 API.
 */

const BaseInterface = require('./baseInterface.js');
const { ai21ApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'ai21';

loadProviderConfig(interfaceName);
const config = getConfig();

class AI21 extends BaseInterface {
  constructor(apiKey) {
    super(interfaceName, apiKey || ai21ApiKey, config[interfaceName].url);
  }

  async embeddings(prompt, options = {}, interfaceOptions = {}) {
    const maxPromptLength = 2000;

    if (prompt.length > maxPromptLength) {
      const sentences = prompt.match(/[^.!?]+[.!?]+[\])'"`’”]*|.+/g);
      const chunks = [];
      let currentChunk = '';

      for (const sentence of sentences) {
        if ((currentChunk + sentence).length <= maxPromptLength) {
          currentChunk += sentence;
        } else {
          chunks.push(currentChunk.trim());
          currentChunk = sentence;
        }
      }

      if (currentChunk) {
        chunks.push(currentChunk.trim());
      }

      prompt = chunks;
    } else {
      prompt = [prompt];
    }

    return super.embeddings(prompt, options, interfaceOptions);
  }
}

module.exports = AI21;
