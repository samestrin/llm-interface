/**
 * @file groq.js
 * @class Groq
 * @description Wrapper class for the Groq API.
 * @param {string} apiKey - The API key for Groq.
 */

const GroqSDK = require("groq-sdk");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module

class Groq {
  /**
   * @constructor
   * @param {string} apiKey - The API key for Groq.
   */
  constructor(apiKey) {
    this.groq = new GroqSDK({
      apiKey: apiKey,
    });
  }

  /**
   * Sends a message to the Groq API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {number} [cacheTimeoutSeconds] - Optional timeout in seconds for caching the response.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const groq = new Groq(apiKey);
   * groq.sendMessage(message, { max_tokens: 150 }, 60).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, cacheTimeoutSeconds) {
    const { max_tokens = 150, model = message.model || "llama3-8b-8192" } =
      options;
    const params = {
      model,
      messages: message.messages,
      max_tokens,
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
      const chatCompletion = await this.groq.chat.completions.create(params);
      const responseContent =
        chatCompletion &&
        chatCompletion.choices &&
        chatCompletion.choices[0] &&
        chatCompletion.choices[0].message &&
        chatCompletion.choices[0].message.content
          ? chatCompletion.choices[0].message.content
          : null;
      if (cacheTimeoutSeconds) {
        saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
      }
      return responseContent;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
}

module.exports = Groq;
