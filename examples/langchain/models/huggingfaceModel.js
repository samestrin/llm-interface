/**
 * @file examples/langchain/models/huggingface.js
 * @description Example custom HuggingFace model that is compatible with langchain. You can easily replicate this using any of the LLM providers that llm-interface supports.
 */

const { LLMInterface } = require('../../../src/index.js');

class HuggingFaceModel {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.interface = 'huggingface';
  }

  async call(prompt, options = {}) {
    const response = await LLMInterface.sendMessage(
      [this.interface, this.apiKey],
      prompt,
      options,
    );
    return response.results; // Adjust based on actual response structure
  }
}

module.exports = HuggingFaceModel;
