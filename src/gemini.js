/**
 * @file gemini.js
 * @class Gemini
 * @description Wrapper class for the Google Gemini API.
 * @param {string} apiKey - The API key for Google Gemini.
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module
const { returnMessageObject } = require("./utils");

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
    let history = input.messages.slice(0, -1).map((message) => ({
      role: message.role,
      parts: [{ text: message.content }],
    }));

    if (history.length > 0 && history[0].role !== "user") {
      history[0].role = "user";
    }
    const prompt = input.messages[input.messages.length - 1].content;

    const response_mime_type =
      response_format == "json_object" ? "application/json" : "text/plain";

    const generationConfig = {
      maxOutputTokens: max_tokens,
      ...(response_format && { response_mime_type }),
    };

    return { history, prompt, generationConfig };
  }

  /**
   * Sends a message to the Google Gemini API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {Object | number} [interfaceOptions={}] - Optional interface options, including cache timeout and retry attempts.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const gemini = new Gemini(apiKey);
   * const interfaceOpts = {
   *   cacheTimeoutSeconds: 300,
   *   retryAttempts: 3,
   * };
   * gemini.sendMessage(message, { max_tokens: 150 }, interfaceOpts).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    if (typeof message === "string") {
      message = returnMessageObject(message);
    }
    let cacheTimeoutSeconds;
    if (typeof interfaceOptions === "number") {
      cacheTimeoutSeconds = interfaceOptions;
    } else {
      cacheTimeoutSeconds = interfaceOptions.cacheTimeoutSeconds;
    }

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

    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;
    while (retryAttempts >= 0) {
      try {
        const modelInstance = this.genAI.getGenerativeModel({ model });
        const chat = modelInstance.startChat({ history, generationConfig });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        let text = await response.text();

        if (response_format === "json_object") {
          try {
            text = JSON.parse(text);
          } catch (e) {
            text = null;
          }
        }

        if (cacheTimeoutSeconds && text) {
          saveToCache(cacheKey, text, cacheTimeoutSeconds);
        }
        return text;
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
          if (error.response) {
            console.error("Response data:", error.response.data);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up the request:", error.message);
          }
          throw error;
        }
        // Implement progressive delay
        const delay = (currentRetry + 1) * 0.3 * 1000; // milliseconds
        await new Promise((resolve) => setTimeout(resolve, delay));
        currentRetry++;
      }
    }
  }
}

module.exports = Gemini;
