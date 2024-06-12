/**
 * @file reka.js
 * @class Reka
 * @description Wrapper class for the Reka AI HTTP API.
 * @param {string} apiKey - The API key for OpenAI.
 */

const axios = require("axios");

/**
 * Class representing a wrapper for the Reka API.
 *
 * @class
 * @param {string} apiKey - The API key for authentication.
 */

class Reka {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: "https://api.reka.ai/v1",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": this.apiKey,
      },
    });
  }

  /**
   * Sends a message to the Reka API.
   *
   * @async
   * @param {Object} message - The message object containing the messages to be sent.
   * @param {Object} [options={}] - Additional options for the API call.
   * @param {string} [options.model="reka-core"] - The model to be used for processing the message.
   * @returns {Promise<string>} The response content from the API.
   * @throws {Error} Throws an error if the API call fails or the response format is unexpected.
   *
   * @example
   * const response = await wrapper.sendMessage({ messages: [{ role: 'user', content: 'Hello' }] });
   */
  async sendMessage(message, options = {}) {
    const { model = "reka-core" } = options;

    // Convert all "system" roles to "assistant" and "user" to "user", start with "user"
    const convertedMessages = message.messages.map((msg, index) => {
      if (msg.role === "system") {
        return { ...msg, role: "assistant" };
      }
      return { ...msg, role: "user" };
    });

    // Add stream: false to the message object
    const modifiedMessage = {
      messages: convertedMessages,
      model,
      stream: false,
    };

    try {
      const response = await this.client.post("/chat", modifiedMessage);

      const stopResponse = response.data.responses.find(
        (resp) => resp.finish_reason === "stop"
      );

      if (
        !stopResponse ||
        !stopResponse.message ||
        !stopResponse.message.content
      ) {
        throw new Error("Unexpected response format");
      }

      return stopResponse.message.content;
    } catch (error) {
      console.error(
        "API Error:",
        error.response ? error.response.data : error.message
      ); // Log the error for debugging
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
}

module.exports = Reka;
