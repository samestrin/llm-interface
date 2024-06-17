/**
 * @file anthropic.js
 * @class Anthropic
 * @description Wrapper class for the Anthropic API.
 * @param {string} apiKey - The API key for Anthropic.
 */

const AnthropicSDK = require("@anthropic-ai/sdk");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module
const { returnSimpleMessageObject } = require("./utils");

class Anthropic {
  /**
   * @constructor
   * @param {string} apiKey - The API key for Anthropic.
   */
  constructor(apiKey) {
    this.anthropic = new AnthropicSDK({
      apiKey: apiKey,
    });
  }

  /**
   * Sends a message to the Anthropic API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {Object | number} [interfaceOptions={}] - Optional interface options, including cache timeout and retry attempts.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const anthropic = new Anthropic(apiKey);
   * const interfaceOpts = {
   *   cacheTimeoutSeconds: 300,
   *   retryAttempts: 3,
   * };
   * anthropic.sendMessage(message, { max_tokens: 150 }, interfaceOpts).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    if (typeof message === "string") {
      message = returnSimpleMessageObject(message);
    }

    let cacheTimeoutSeconds;
    if (typeof interfaceOptions === "number") {
      cacheTimeoutSeconds = interfaceOptions;
    } else {
      cacheTimeoutSeconds = interfaceOptions.cacheTimeoutSeconds;
    }

    const {
      max_tokens = 150,
      model = message.model || "claude-3-opus-20240229",
    } = options;

    // Convert message roles as required by the API
    const convertedMessages = message.messages.map((msg, index) => {
      if (index === 0) {
        return { ...msg, role: "user" };
      }
      if (msg.role === "system") {
        return { ...msg, role: "assistant" };
      }
      return { ...msg, role: index % 2 === 0 ? "user" : "assistant" };
    });

    const params = {
      max_tokens,
      messages: convertedMessages,
      model,
    };

    // Create cache key and check for cached response
    const cacheKey = JSON.stringify(params);
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
        const response = await this.anthropic.messages.create(params);
        let responseContent = null;
        if (
          response &&
          response.content &&
          response.content[0] &&
          response.content[0].text
        ) {
          responseContent = response.content[0].text;
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

module.exports = Anthropic;
