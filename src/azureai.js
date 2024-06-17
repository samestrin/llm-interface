// AzureAI.js

const axios = require("axios");
const { getFromCache, saveToCache } = require("./cache");

class AzureAI {
  /**
   * @constructor
   * @param {string} apiKey - The API key for Azure AI.
   */
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: "https://api.ai.azure.com", // You might need to specify a region here
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Sends a message to the Azure AI API.
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
      model = "llama2-70b-chat",
      frequency_penalty = 0,
      presence_penalty = 0,
      max_tokens = 256,
      seed = 42,
      stop = "<|endoftext|>",
      stream = false,
      temperature = 0,
      top_p = 1,
    } = options;

    const requestBody = {
      model,
      messages,
      frequency_penalty,
      presence_penalty,
      max_tokens,
      response_format: { type: "text" },
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
          "/chat/completions?api-version=2024-04-01-preview",
          requestBody
        );

        let responseContent = null;
        if (
          response &&
          response.choices &&
          response.choices[0] &&
          response.choices[0].message
        ) {
          responseContent = response.choices[0].message.content;
        }

        if (response_format === "json_object") {
          try {
            responseContent = JSON.parse(responseContent);
          } catch (e) {
            responseContent = null;
          }
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

module.exports = AzureAI;
