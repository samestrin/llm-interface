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
   * @param {Object | number} [interfaceOptions={}] - Optional interface options, including cache timeout and retry attempts.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const groq = new Groq(apiKey);
   * const interfaceOpts = {
   *   cacheTimeoutSeconds: 300,
   *   retryAttempts: 3,
   * };
   * groq.sendMessage(message, { max_tokens: 150 }, interfaceOpts).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    let cacheTimeoutSeconds;
    if (typeof interfaceOptions === "number") {
      cacheTimeoutSeconds = interfaceOptions;
    } else {
      cacheTimeoutSeconds = interfaceOptions.cacheTimeoutSeconds;
    }

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

    let retryAttempts = interfaceOptions.retryAttempts || 0;
    while (retryAttempts >= 0) {
      try {
        const chatCompletion = await this.groq.chat.completions.create(params);
        let responseContent = null;
        if (
          chatCompletion &&
          chatCompletion.choices &&
          chatCompletion.choices[0] &&
          chatCompletion.choices[0].message &&
          chatCompletion.choices[0].message.content
        ) {
          responseContent = chatCompletion.choices[0].message.content;
        }

        if (cacheTimeoutSeconds && responseContent) {
          saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
        }
        return responseContent;
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
          throw new Error(error.response.data.error.message);
        }
      }
    }
  }
}

module.exports = Groq;
