// AI21.js

const axios = require("axios");
const { getFromCache, saveToCache } = require("./cache");

class AI21 {
  /**
   * @constructor
   * @param {string} apiKey - The API key for AI21.
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: "https://api.ai21.com/studio/v1",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Sends a message to the AI21 API.
   *
   * @param {Object} message - The message object containing the messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {Object | number} [interfaceOptions={}] - Optional interface options, including cache timeout and retry attempts.
   * @returns {Promise<Object|null>} The response object from the API.
   * @throws {Error} Throws an error if the API request fails.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    let cacheTimeoutSeconds;
    if (typeof interfaceOptions === "number") {
      cacheTimeoutSeconds = interfaceOptions;
    } else {
      cacheTimeoutSeconds = interfaceOptions.cacheTimeoutSeconds;
    }

    const { messages } = message;
    const {
      model = "jamba-instruct",
      max_tokens = 200,
      temperature = 1,
      top_p = 1,
      stop = "<|endoftext|>",
    } = options;

    const requestBody = {
      model,
      messages,
      max_tokens,
    };

    // Create cache key and check for cached response
    const cacheKey = JSON.stringify(requestBody);
    if (cacheTimeoutSeconds) {
      const cachedResponse = getFromCache(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    let retryAttempts = interfaceOptions.retryAttempts || 0;
    while (retryAttempts >= 0) {
      try {
        const response = await this.client.post(
          "/chat/completions",
          requestBody
        );
        let responseContent = null;
        if (
          response &&
          response.data &&
          response.data.choices &&
          response.data.choices[0] &&
          response.data.choices[0].message &&
          response.data.choices[0].message.content
        ) {
          responseContent = response.data.choices[0].message.content;
        }

        if (cacheTimeoutSeconds && responseContent) {
          saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
        }
        return responseContent;
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
          console.error("API Error:", error.message);
          throw new Error(error.message);
        }
      }
    }
  }
}

module.exports = AI21;
