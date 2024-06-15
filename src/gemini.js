/**
 * @file gemini.js
 * @class Gemini
 * @description Wrapper class for the Google Gemini API.
 * @param {string} apiKey - The API key for Google Gemini.
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module

class Gemini {
  /**
   * @constructor
   * @param {string} apiKey - The API key for Google Gemini.
   */
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Converts the input data structure for the API request.
   *
   * @param {Object} input - The input message object.
   * @param {number} max_tokens - Maximum number of tokens for the response.
   * @param {string} response_format - Desired response format.
   * @returns {Object} The converted data structure.
   */
  convertDataStructure(input, max_tokens, response_format) {
    if (response_format === "json_object") {
      response_format = "application/json";
    }
    let history = input.messages.slice(0, -1).map((message) => ({
      role: message.role,
      parts: [{ text: message.content }],
    }));

    if (history.length > 0 && history[0].role !== "user") {
      history[0].role = "user";
    }
    const prompt = input.messages[input.messages.length - 1].content;
    return {
      history,
      prompt,
      generationConfig: {
        maxOutputTokens: max_tokens,
        ...(response_format && { response_mime_type: response_format }),
      },
    };
  }

  /**
   * Sends a message to the Google Gemini API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {number} [cacheTimeoutSeconds] - Optional timeout in seconds for caching the response.
   * @returns {Promise<string>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const gemini = new Gemini(apiKey);
   * gemini.sendMessage(message, { max_tokens: 150 }, 60).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, cacheTimeoutSeconds) {
    const {
      max_tokens = 150,
      model = message.model || "gemini-1.5-flash",
      response_format,
    } = options;
    const { history, prompt, generationConfig } = this.convertDataStructure(
      message,
      max_tokens,
      response_format
    );

    const cacheKey = JSON.stringify({
      model,
      history,
      prompt,
      generationConfig,
    });
    if (cacheTimeoutSeconds) {
      const cachedResponse = getFromCache(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    try {
      const modelInstance = this.genAI.getGenerativeModel({ model });
      const chat = modelInstance.startChat({ history, generationConfig });
      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = await response.text();
      if (cacheTimeoutSeconds) {
        saveToCache(cacheKey, text, cacheTimeoutSeconds);
      }
      return text;
    } catch (error) {
      throw new Error(`Gemini API error: ${error.message}`);
    }
  }
}

module.exports = Gemini;
