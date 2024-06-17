/**
 * @file huggingface.js
 * @class Hugging Face Inference API
 * @description Wrapper class for the Hugging Face Inference API.
 * @param {string} apiKey - The API key for Hugging Face Inference API.
 */

const axios = require("axios");
const { getFromCache, saveToCache } = require("./cache"); // Import caching functions

class HuggingFace {
  /**
   * @constructor
   * @param {string} apiKey - The API key for accessing the HuggingFace API.
   */
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: "https://api-inference.huggingface.co/models/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Sends a message to the HuggingFace API.
   * @param {object} message - The message object containing model and messages to send.
   * @param {object} options - Optional parameters such as max_tokens and model.
   * @param {Object | number} [interfaceOptions={}] - Optional interface options, including cache timeout and retry attempts.
   * @returns {Promise<string|null>} - A promise that resolves to the response text or null if an error occurs.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    let cacheTimeoutSeconds;
    if (typeof interfaceOptions === "number") {
      cacheTimeoutSeconds = interfaceOptions;
    } else {
      cacheTimeoutSeconds = interfaceOptions.cacheTimeoutSeconds;
    }

    const { model: messageModel, messages } = message;
    const {
      max_tokens = 150,
      model = messageModel || "meta-llama/Meta-Llama-3-8B-Instruct",
    } = options;

    const prompt = messages.map((msg) => msg.content).join(" ");

    const payload = {
      inputs: prompt,
      parameters: { max_new_tokens: max_tokens, ...options },
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
    while (retryAttempts >= 0) {
      try {
        const response = await this.client.post(`${model}`, payload);
        let responseContent = null;

        if (
          response &&
          response.data &&
          response.data[0] &&
          response.data[0].generated_text
        ) {
          responseContent = response.data[0].generated_text;
        }

        if (cacheTimeoutSeconds && responseContent) {
          saveToCache(cacheKey, responseContent, cacheTimeoutSeconds);
        }
        return responseContent;
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
          // Handle errors
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
  }
}

module.exports = HuggingFace;
