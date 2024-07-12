const { LLMInterface } = require('../../../src/index.js');

class NovitaAI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.interfaceName = 'novitaai';
    this.outputParser = null; // Initialize outputParser as null
  }

  /**
   * Generate text using the Hugging Face model.
   * @param {object} inputs - The input object containing the simplePrompt.
   * @param {object} options - Options for text generation, such as max_tokens.
   * @returns {string} The generated text.
   */
  async call(simplePrompt, options = { max_tokens: 1024, model: 'default' }) {
    const response = await LLMInterface.sendMessage(
      [this.interfaceName, this.apiKey],
      simplePrompt,
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
   * @returns {NovitaAI} The current instance for method chaining.
   */
  pipe(outputParser) {
    this.outputParser = outputParser;
    return this; // Allow method chaining
  }

  /**
   * Invoke method required by langchain.
   * @param {object} inputs - The input object containing the simplePrompt.
   * @param {object} runManager - An optional run manager object.
   * @returns {string} The generated text.
   */
  async invoke(inputs, runManager) {
    const simplePrompt = inputs.value;
    return this.call(simplePrompt);
  }

  /**
   * Get the model type.
   * @returns {string} The model type string.
   */
  _modelType() {
    return LLMInterface.getModelConfigValue(
      this.interfaceName,
      'model.default',
    );
  }
}

module.exports = NovitaAI;
