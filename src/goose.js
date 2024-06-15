/**
 * @file goose.js
 * @class Goose
 * @description Wrapper class for the Goose AI API.
 * @param {string} apiKey - The API key for Goose AI.
 */

const axios = require("axios");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module

class Goose {
  /**
   * @constructor
   * @param {string} apiKey - The API key for Goose AI.
   */
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: "https://api.goose.ai",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Sends a message to the Goose AI API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {number} [cacheTimeoutSeconds] - Optional timeout in seconds for caching the response.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const goose = new Goose(apiKey);
   * goose.sendMessage(message, { max_tokens: 150 }, 60).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, cacheTimeoutSeconds) {
    const { messages } = message;
    const { max_tokens = 150 } = options;
    let { model } = message;

    // Set default model if not provided
    model = model || options.model || "gpt-neo-20b";

    // Prepare the payload for the API request
    const formattedPrompt = messages
      .map((message) => message.content)
      .join(" ");
    const payload = {
      prompt: formattedPrompt,
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
      const url = `https://api.goose.ai/v1/engines/${model}/completions`;
      const response = await this.client.post(url, payload);
      const responseText =
        response &&
        response.data &&
        response.data.choices &&
        response.data.choices[0] &&
        response.data.choices[0].text
          ? response.data.choices[0].text.trim()
          : null;
      if (cacheTimeoutSeconds) {
        saveToCache(cacheKey, responseText, cacheTimeoutSeconds);
      }
      return responseText;
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

module.exports = Goose;
