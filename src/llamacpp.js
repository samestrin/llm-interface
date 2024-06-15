/**
 * @file llamacpp.js
 * @class LlamaCPP
 * @description Wrapper class for the LLaMA.cpp API.
 * @param {string} llamacppURL - The URL for the LLaMA.cpp HTTP server.
 */

const axios = require("axios");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module

class LlamaCPP {
  /**
   * @constructor
   * @param {string} llamacppURL - The URL for the LLaMA.cpp HTTP server.
   */
  constructor(llamacppURL) {
    this.client = axios.create({
      baseURL: llamacppURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Sends a message to the LLaMA.cpp API.
   *
   * @param {Object} prompt - The prompt object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {number} [cacheTimeoutSeconds] - Optional timeout in seconds for caching the response.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const llamacpp = new LlamaCPP(llamacppURL);
   * llamacpp.sendMessage(prompt, { max_tokens: 150 }, 60).then(console.log).catch(console.error);
   */
  async sendMessage(prompt, options = {}, cacheTimeoutSeconds) {
    const { max_tokens = 150 } = options;

    // Prepare the payload for the API request
    const formattedPrompt = prompt.messages
      .map((message) => message.content)
      .join(" ");
    const payload = {
      prompt: formattedPrompt,
      n_predict: max_tokens,
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
      const response = await this.client.post("", payload);
      let contents;
      if (response.data.content) {
        contents = response.data.content;
      } else if (response.data.results) {
        contents = response.data.results.map((result) => result.content).join();
      } else {
        contents = "";
      }
      if (cacheTimeoutSeconds) {
        saveToCache(cacheKey, contents, cacheTimeoutSeconds);
      }
      return contents;
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

module.exports = LlamaCPP;
