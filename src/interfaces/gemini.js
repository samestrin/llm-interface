/**
 * @file src/interfaces/gemini.js
 * @class Gemini
 * @description Wrapper class for the Gemini API.
 * @param {string} apiKey - The API key for the Gemini API.
 */
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { getModelByAlias } = require('../utils/config.js');
const { getMessageObject, parseJSON, delay } = require('../utils/utils.js');
const { geminiApiKey } = require('../config/config.js');
const { getConfig } = require('../utils/configManager.js');
const { RequestError } = require('../utils/errors.js');
const config = getConfig();
const log = require('loglevel');

// Gemini class for interacting with the Gemini API
class Gemini {
  /**
   * Constructor for the Gemini class.
   * @param {string} apiKey - The API key for the Gemini API.
   */
  constructor(apiKey) {
    this.interfaceName = 'gemini';
    this.apiKey = apiKey || geminiApiKey;
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
    const prompt = input.messages[input.messages.length - 1].content;
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
    model =
      model || options.model || config[this.interfaceName].model.default.name;

    const selectedModel = getModelByAlias(this.interfaceName, model);
    let max_tokens = options.max_tokens || 150;
    let response_format = options.response_format || '';

    if (options.model) delete options.model;
    if (options.max_tokens) delete options.max_tokens;
    if (options.response_format) delete options.response_format;

    // Set the model and default values
    model =
      selectedModel ||
      options.model ||
      config[this.interfaceName].model.default.name;
    const { history, prompt, generationConfig } = this.convertDataStructure(
      messageObject,
      max_tokens,
      response_format,
      options,
    );

    // Set up retry mechanism with exponential backoff
    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;
    while (retryAttempts >= 0) {
      try {
        // Get the generative model instance for the selected model
        const modelInstance = this.genAI.getGenerativeModel({ model });
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
          responseContent = { results: responseContent };

          // optionally include the original llm api response
          if (interfaceOptions.includeOriginalResponse) {
            //responseContent.originalResponse = response; @todo not implemented yet
          }

          return responseContent;
        }
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
          log.error('Error:', error.response ? error.response.data : null);
          throw new RequestError(
            `Unable to connect Google Gemini SDK (${retryAttempts + 1} attempts`,
            error.message,
            error.stack,
          );
        }

        // Calculate the delay for the next retry attempt
        let retryMultiplier = interfaceOptions.retryMultiplier || 0.3;
        const delayTime = (currentRetry + 1) * retryMultiplier * 1000;
        await delay(delayTime);

        currentRetry++;
      }
    }
  }
}

module.exports = Gemini;
