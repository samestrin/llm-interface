/**
 * @file goose.js
 * @class Goose
 * @description Wrapper class for the Goose AI API.
 * @param {string} apiKey - The API key for Goose AI.
 */

const axios = require("axios");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module
const { returnMessageObject } = require("./utils");

class Goose {
  /**
   * @constructor
   * @param {string} apiKey - The API key for Goose AI.
   */
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: "https://api.goose.ai",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Sends a message to the Goose AI API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {Object | number} [interfaceOptions={}] - Optional interface options, including cache timeout and retry attempts.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const goose = new Goose(apiKey);
   * const interfaceOpts = {
   *   cacheTimeoutSeconds: 300,
   *   retryAttempts: 3,
   * };
   * goose.sendMessage(message, { max_tokens: 150 }, interfaceOpts).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    if (typeof message === "string") {
      message = returnMessageObject(message);
    }
    let cacheTimeoutSeconds;
    if (typeof interfaceOptions === "number") {
      cacheTimeoutSeconds = interfaceOptions;
    } else {
      cacheTimeoutSeconds = interfaceOptions.cacheTimeoutSeconds;
    }

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

    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;
    while (retryAttempts >= 0) {
      try {
        const url = `https://api.goose.ai/v1/engines/${model}/completions`;
        const response = await this.client.post(url, payload);
        let responseText = null;
        if (
          response &&
          response.data &&
          response.data.choices &&
          response.data.choices[0] &&
          response.data.choices[0].text
        ) {
          responseText = response.data.choices[0].text.trim();
        }

        if (cacheTimeoutSeconds && responseText) {
          saveToCache(cacheKey, responseText, cacheTimeoutSeconds);
        }
        return responseText;
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

module.exports = Goose;
