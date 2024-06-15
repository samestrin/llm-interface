/**
 * @file mistral.js
 * @class Mistral
 * @description Wrapper class for the Mistral AI API.
 * @param {string} apiKey - The API key for Mistral AI.
 */

const axios = require("axios");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module

class Mistral {
  /**
   * @constructor
   * @param {string} apiKey - The API key for Mistral AI.
   */
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: "https://api.mistral.ai",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Sends a message to the Mistral AI API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {number} [cacheTimeoutSeconds] - Optional timeout in seconds for caching the response.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const mistral = new Mistral(apiKey);
   * mistral.sendMessage(message, { max_tokens: 150 }, 60).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, cacheTimeoutSeconds) {
    let { model, messages } = message;

    // Set default model if not provided
    model = model || options.model || "mistral-large-latest";

    const payload = {
      model,
      messages,
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
      const response = await this.client.post(`/chat/completions`, payload);
      const responseContent =
        response &&
        response.data &&
        response.data.choices &&
        response.data.choices[0] &&
        response.data.choices[0].message &&
        response.data.choices[0].message.content
          ? response.data.choices[0].message.content
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

module.exports = Mistral;
