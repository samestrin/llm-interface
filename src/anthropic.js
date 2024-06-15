/**
 * @file anthropic.js
 * @class Anthropic
 * @description Wrapper class for the Anthropic API.
 * @param {string} apiKey - The API key for Anthropic.
 */

const AnthropicSDK = require("@anthropic-ai/sdk");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module

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
   * @param {number} [cacheTimeoutSeconds] - Optional timeout in seconds for caching the response.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const anthropic = new Anthropic(apiKey);
   * anthropic.sendMessage(message, { max_tokens: 150 }, 60).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, cacheTimeoutSeconds) {
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

    try {
      // Make API request and cache the response
      const response = await this.anthropic.messages.create(params);
      const responseContent =
        response &&
        response.content &&
        response.content[0] &&
        response.content[0].text
          ? response.content[0].text
          : null;
      if (cacheTimeoutSeconds) {
        saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
      }
      return responseContent;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.error.message : error.message
      );
    }
  }
}

module.exports = Anthropic;
