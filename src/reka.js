/**
 * @file reka.js
 * @class Reka
 * @description Wrapper class for the Reka AI API.
 * @param {string} apiKey - The API key for Reka AI.
 */

const axios = require("axios");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module

class Reka {
  /**
   * @constructor
   * @param {string} apiKey - The API key for Reka AI.
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: "https://api.reka.ai",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
      },
    });
  }

  /**
   * Sends a message to the Reka AI API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {number} [cacheTimeoutSeconds] - Optional timeout in seconds for caching the response.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const reka = new Reka(apiKey);
   * reka.sendMessage(message, { max_tokens: 150 }, 60).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, cacheTimeoutSeconds) {
    let { model } = message;

    // Set default model if not provided
    model = model || options.model || "reka-core";

    // Convert message roles as required by the API
    const convertedMessages = message.messages.map((msg, index) => {
      if (msg.role === "system") {
        return { ...msg, role: "assistant" };
      }
      return { ...msg, role: "user" };
    });

    const modifiedMessage = {
      messages: convertedMessages,
      model,
      stream: false,
    };

    // Create cache key and check for cached response
    const cacheKey = JSON.stringify(modifiedMessage);
    if (cacheTimeoutSeconds) {
      const cachedResponse = getFromCache(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    try {
      // Make API request and cache the response
      const response = await this.client.post("/v1/chat", modifiedMessage);

      // Check for the response content
      const responseContent =
        response.data?.responses?.[0]?.message?.content || null;

      if (!responseContent) {
        throw new Error("Unexpected response format");
      }

      if (cacheTimeoutSeconds) {
        saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
      }

      return responseContent;
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      );
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

module.exports = Reka;
