

const fetch = require('node-fetch');
const { LLMInterface } = require('llm-interface');

class GroqModel {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.interface = 'groq';
  }

  async call(prompt, options = {}) {
    const response = await LLMInterface.sendMessage(this.interface, prompt, {
      apiKey: this.apiKey,
      ...options,
    });
    return response.results; // Adjust based on actual response structure
  }
}

module.exports = GroqModel;
