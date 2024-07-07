const { LLMInterface } = require('../../../src/index.js');

class ShuttleAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.interface = 'shuttleai';
    this.outputParser = null; // Initialize outputParser as null
  }

  /**
   * Generate text using the Hugging Face model.
   * @param {object} inputs - The input object containing the prompt.
   * @param {object} options - Options for text generation, such as max_tokens.
   * @returns {string} The generated text.
   */
  async call(prompt, options = { max_tokens: 1024, model: 'default' }) {
    const response = await LLMInterface.sendMessage(
      [this.interface, this.apiKey],
      prompt,
      options,
    );

    // Assume response.results contains the generated text
    let generatedText = response.results;

    // If an output parser is set, process the generated text with it
    if (this.outputParser && typeof this.outputParser.parse === 'function') {
      generatedText = this.outputParser.parse(generatedText);
    }

    return generatedText;
  }

  /**
   * Attach an output parser to process the generated text.
   * @param {object} outputParser - The parser object with a `parse` method.
   * @returns {ShuttleAI} The current instance for method chaining.
   */
  pipe(outputParser) {
    this.outputParser = outputParser;
    return this; // Allow method chaining
  }

  /**
   * Invoke method required by langchain.
   * @param {object} inputs - The input object containing the prompt.
   * @param {object} runManager - An optional run manager object.
   * @returns {string} The generated text.
   */
  async invoke(inputs, runManager) {
    const prompt = inputs.value;
    return this.call(prompt);
  }

  /**
   * Get the model type.
   * @returns {string} The model type string.
   */
  _modelType() {
    return LLMInterface.getModelConfigValue(this.interface, 'model.default');
  }
}

module.exports = ShuttleAI;
