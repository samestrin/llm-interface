/**
 * @file reka.js
 * @class Reka
 * @description Wrapper class for the Reka AI API.
 * @param {string} apiKey - The API key for Reka AI.
 */

const axios = require("axios");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module
const { returnSimpleMessageObject } = require("./utils");

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
   * @param {Object | number} [interfaceOptions={}] - Optional interface options, including cache timeout and retry attempts.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const reka = new Reka(apiKey);
   * const interfaceOpts = {
   *   cacheTimeoutSeconds: 300,
   *   retryAttempts: 3,
   * };
   * reka.sendMessage(message, { max_tokens: 150 }, interfaceOpts).then(console.log).catch(console.error);
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
    const { max_tokens = 150 } = options;
    const modifiedMessage = {
      messages: convertedMessages,
      model,
      max_tokens,
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

    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;
    while (retryAttempts >= 0) {
      try {
        const response = await this.client.post("/v1/chat", modifiedMessage);
        let responseContent = null;

        if (response.data?.responses?.[0]?.message?.content) {
          responseContent = response.data.responses[0].message.content;
        }

        if (cacheTimeoutSeconds && responseContent) {
          saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
        }
        return responseContent;
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
          console.error(
            "API Error:",
            error.response ? error.response.data : error.message
          );
          throw new Error(error.response ? error.response.data : error.message);
        }
        // Implement progressive delay
        const delay = (currentRetry + 1) * 0.3 * 1000; // milliseconds
        await new Promise((resolve) => setTimeout(resolve, delay));
        currentRetry++;
      }
    }
  }
}

module.exports = Reka;
