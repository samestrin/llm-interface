/**
 * @file cohere.js
 * @class Cohere
 * @description Wrapper class for the Cohere API.
 * @param {string} apiKey - The API key for Cohere.
 */

const axios = require("axios");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module

class Cohere {
  /**
   * @constructor
   * @param {string} apiKey - The API key for Cohere.
   */
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: "https://api.cohere.ai",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Sends a message to the Cohere API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {number} [cacheTimeoutSeconds] - Optional timeout in seconds for caching the response.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const cohere = new Cohere(apiKey);
   * cohere.sendMessage(message, { max_tokens: 150 }, 60).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, cacheTimeoutSeconds) {
    const { messages } = message;
    const { max_tokens = 150 } = options;
    let { model } = message;

    // Set default model if not provided
    model = model || options.model || "command-r-plus";

    // Prepare the payload for the API request
    const chat_history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "USER" : "CHATBOT",
      message: msg.content,
    }));
    const current_message = messages[messages.length - 1].content;
    const payload = {
      chat_history:
        chat_history.length > 0
          ? chat_history
          : [{ role: "USER", message: "" }],
      message: current_message,
      model,
      max_tokens,
      ...options,
    };

    // Create cache key and check for cached response
    const cacheKey = JSON.stringify(payload);
    if (cacheTimeoutSeconds) {
      const cachedResponse = getFromCache(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    try {
      // Make API request and cache the response
      const response = await this.client.post(`/chat`, payload);
      const responseContent =
        response && response.data && response.data.text
          ? response.data.text
          : null;
      if (cacheTimeoutSeconds) {
        saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
      }
      return responseContent;
    } catch (error) {
      if (error.response) {
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error setting up the request:", error.message);
      }
      throw error;
    }
  }
}

module.exports = Cohere;
