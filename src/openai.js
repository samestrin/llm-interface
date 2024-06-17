/**
 * @file openai.js
 * @class OpenAI
 * @description Wrapper class for the OpenAI API.
 * @param {string} apiKey - The API key for OpenAI.
 */

const { OpenAI: OpenAIClient } = require("openai");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module
const { returnMessageObject } = require("./utils");

class OpenAI {
  /**
   * @constructor
   * @param {string} apiKey - The API key for OpenAI.
   */
  constructor(apiKey) {
    this.openai = new OpenAIClient({
      apiKey: apiKey,
    });
  }

  /**
   * Sends a message to the OpenAI API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {Object | number} [interfaceOptions={}] - Optional interface options, including cache timeout and retry attempts.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const openai = new OpenAI(apiKey);
   * const interfaceOpts = {
   *   cacheTimeoutSeconds: 300,
   *   retryAttempts: 3,
   * };
   * openai.sendMessage(message, { max_tokens: 150 }, interfaceOpts).then(console.log).catch(console.error);
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

    const { model: messageModel, messages } = message;
    const {
      max_tokens = 150,
      model = messageModel || "gpt-3.5-turbo",
      response_format,
    } = options;
    const requestPayload = {
      model,
      messages,
      max_tokens,
      ...(response_format && { response_format: { type: response_format } }),
    };

    const cacheKey = JSON.stringify(requestPayload);
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
        const completion = await this.openai.chat.completions.create(
          requestPayload
        );
        let responseContent = null;
        if (
          completion &&
          completion.choices &&
          completion.choices[0] &&
          completion.choices[0].message
        ) {
          responseContent = completion.choices[0].message.content;
        }

        if (response_format === "json_object") {
          try {
            responseContent = JSON.parse(responseContent);
          } catch (e) {
            responseContent = null;
          }
        }

        if (cacheTimeoutSeconds && responseContent) {
          saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
        }
        return responseContent;
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

module.exports = OpenAI;
