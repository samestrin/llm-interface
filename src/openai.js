/**
 * @file openai.js
 * @class OpenAI
 * @description Wrapper class for the OpenAI API.
 * @param {string} apiKey - The API key for OpenAI.
 */

const { OpenAI: OpenAIClient } = require("openai");
const { getFromCache, saveToCache } = require("./cache"); // Import the cache module

class OpenAI {
  /**
   * @constructor
   * @param {string} apiKey - The API key for OpenAI.
   */
  constructor(apiKey) {
    this.openai = new OpenAIClient({
      apiKey: apiKey,
    });
  }

  /**
   * Sends a message to the OpenAI API.
   *
   * @param {Object} message - The message object containing the model and messages to send.
   * @param {Object} [options={}] - Optional parameters for the request.
   * @param {number} [cacheTimeoutSeconds] - Optional timeout in seconds for caching the response.
   * @returns {Promise<string|null>} The response text from the API.
   * @throws {Error} Throws an error if the API request fails.
   *
   * @example
   * const openai = new OpenAI(apiKey);
   * openai.sendMessage(message, { max_tokens: 150 }, 60).then(console.log).catch(console.error);
   */
  async sendMessage(message, options = {}, cacheTimeoutSeconds) {
    const { model: messageModel, messages } = message;
    const {
      max_tokens = 150,
      model = messageModel || "gpt-3.5-turbo-0613",
      response_format,
    } = options;
    const requestPayload = {
      model,
      messages,
      max_tokens,
      ...(response_format && { response_format: { type: response_format } }),
    };

    const cacheKey = JSON.stringify(requestPayload);
    if (cacheTimeoutSeconds) {
      const cachedResponse = getFromCache(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    try {
      const completion = await this.openai.chat.completions.create(
        requestPayload
      );
      const responseContent =
        completion &&
        completion.choices &&
        completion.choices[0] &&
        completion.choices[0].message &&
        completion.choices[0].message.content
          ? completion.choices[0].message.content
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

module.exports = OpenAI;
