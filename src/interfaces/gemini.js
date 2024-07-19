/**
 * @file src/interfaces/gemini.js
 * @class Gemini
 * @description Wrapper class for the Google Gemini API, extends BaseInterface.
 * @param {string} apiKey - The API key for the Google Gemini API.
 */

const BaseInterface = require('./baseInterface');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const { getModelByAlias } = require('../utils/config.js');
const { getMessageObject, parseJSON } = require('../utils/utils.js');
const { geminiApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { StreamError } = require('../utils/errors.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');
const log = require('loglevel');

const interfaceName = 'gemini';

loadProviderConfig(interfaceName);
const config = getConfig();

// Gemini class for interacting with the Gemini API
class Gemini extends BaseInterface {
  /**
   * Constructor for the Gemini class.
   * @param {string} apiKey - The API key for the Gemini API.
   */
  constructor(apiKey) {
    super(interfaceName, apiKey || geminiApiKey, config[interfaceName].url);
    this.genAI = new GoogleGenerativeAI(this.apiKey);
  }

  /**
   * Convert the input data structure to the format expected by the Gemini API.
   * @param {object} input - The input message object.
   * @param {number} maxTokens - The maximum number of tokens for the response.
   * @param {string} responseFormat - The format of the response ("text" or "json_object").
   * @param {object} generationConfigOptions - Additional options for the generation config.
   * @returns {object} The converted data structure.
   */
  convertDataStructure(
    input,
    maxTokens,
    responseFormat,
    generationConfigOptions = {},
  ) {
    let history = input.messages.slice(0, -1).map((message) => ({
      role: message.role,
      parts: [{ text: message.content }],
    }));
    if (history.length > 0 && history[0].role !== 'user') {
      history[0].role = 'user';
    }
    //const prompt = input.messages[input.messages.length - 1].content;
    const prompt = input.messages.map((message) => message.content).join('\n');

    const responseMimeType =
      responseFormat === 'json_object' ? 'application/json' : 'text/plain';

    // check to see if the model is in the generationConfigOptions and remove

    if (generationConfigOptions.model) delete generationConfigOptions.model;

    const generationConfig = {
      ...generationConfigOptions,
      maxOutputTokens: maxTokens,
      ...(responseFormat && { responseMimeType: responseMimeType }),
    };
    return { history, prompt, generationConfig };
  }

  /**
   * Send a message to the Gemini API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string|object} The response content from the Gemini API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    const messageObject =
      typeof message === 'string' ? getMessageObject(message) : message;

    let { model } = messageObject;

    // Finalize the model name
    model = model || options.model || config[this.interfaceName].model.default;

    const selectedModel = getModelByAlias(this.interfaceName, model);
    let max_tokens = options.max_tokens || 150;
    let response_format = options.response_format || '';
    let stream = options.stream || '';

    if (options.model) delete options.model;
    if (options.max_tokens) delete options.max_tokens;
    if (options.response_format) delete options.response_format;
    if (options.stream) delete options.stream;

    // Set the model and default values
    model =
      selectedModel ||
      options.model ||
      config[this.interfaceName].model.default;

    const { history, prompt, generationConfig } = this.convertDataStructure(
      messageObject,
      max_tokens,
      response_format,
      options,
    );

    // Get the generative model instance for the selected model

    const modelInstance = this.genAI.getGenerativeModel({ model });

    // Is this a stream?
    if (stream) {
      try {
        const results = await modelInstance.generateContentStream(prompt);
        return results;
      } catch (error) {
        throw new StreamError(
          `${this.interfaceName} streaming error`,
          error.message,
          error.stack,
        );
      }
    }

    // Start a chat session with the model
    const chat = modelInstance.startChat({ history, generationConfig });

    // Send the prompt to the model
    const result = await chat.sendMessage(prompt);
    // Get the response from the model
    const response = await result.response;
    let responseContent = await response.text();

    // Attempt to repair the object if needed
    if (
      responseContent &&
      response_format === 'json_object' &&
      typeof responseContent === 'string'
    ) {
      try {
        responseContent = JSON.parse(responseContent);
      } catch {
        responseContent = await parseJSON(
          responseContent,
          interfaceOptions.attemptJsonRepair,
        );
      }
    } else if (responseContent && interfaceOptions.attemptJsonRepair) {
      responseContent = await parseJSON(
        responseContent,
        interfaceOptions.attemptJsonRepair,
      );
    }

    if (responseContent) {
      // Build response object
      responseContent = { results: responseContent, success: true };

      // optionally include the original llm api response
      if (interfaceOptions.includeOriginalResponse) {
        //responseContent.originalResponse = response; @todo not implemented yet
      }

      return responseContent;
    }
  }

  /**
   * Fetches embeddings for a given prompt using the specified model and options.
   *
   * @async
   * @param {string} prompt - The input prompt to get embeddings for.
   * @param {Object} [options={}] - Optional parameters for embeddings.
   * @param {string} [options.model] - The model to use for embeddings.
   * @param {Object} [interfaceOptions={}] - Interface-specific options.
   * @param {boolean} [interfaceOptions.includeOriginalResponse] - Whether to include the original response in the result.
   *
   * @returns {Promise<Object>} An object containing the embeddings and optionally the original response.
   *
   * @throws {EmbeddingsError} If the interface does not support embeddings or the embedding URL is not found.
   * @throws {RequestError} If the request to fetch embeddings fails.
   */
  async embeddings(prompt, options = {}, interfaceOptions = {}) {
    // get embeddings model
    const selectedModel =
      options.model || config[this.interfaceName].embeddings.default;

    const model = this.genAI.getGenerativeModel({ model: selectedModel });
    const result = await model.embedContent(prompt);

    try {
      const embedding = result.embedding.values;

      const responseContent = { results: embedding };

      if (interfaceOptions.includeOriginalResponse) {
        responseContent.originalResponse = result;
      }

      return responseContent;
    } catch (error) {
      throw new RequestError(
        `Failed to fetch embeddings: ${error.message}`,
        error.stack,
      );
    }
  }
}

module.exports = Gemini;
