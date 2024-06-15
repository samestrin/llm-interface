/**
 * @file cohere.js
 * @description Wrapper class for the Cohere API.
 * @param {string} apiKey - The API key for Cohere.
 */

const axios = require("axios");

class Cohere {
  /**
   * Creates an instance of the Cohere class.
   *
   * @constructor
   * @param {string} apiKey - The API key for Cohere.
   */
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: "https://api.cohere.com/v1",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Sends a message to the Cohere API and returns the response.
   *
   * @param {Object} message - The message object containing model and messages.
   * @param {string} message.model - The model to use for the request.
   * @param {Array<Object>} message.messages - The array of message objects to form the chat history and current message.
   * @param {Object} [options] - Optional parameters for the request.
   * @returns {Promise<string>} The response text from the API.
   * @throws {Error} Throws an error if the request fails.
   *
   * @example
   * const message = {
   *   model: "command-r-plus",
   *   messages: [
   *     { role: "user", content: "Hello." },
   *     { role: "system", content: "You are a helpful assistant." },
   *     { role: "user", content: "Explain the importance of low latency LLMs." }
   *   ],
   * };
   * cohere.sendMessage(message, { max_tokens: 100 })
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   */
  async sendMessage(message, options = {}) {
    const { model, messages } = message;

    // Convert messages to the expected format for Cohere API
    const chat_history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "user" ? "USER" : "CHATBOT",
      message: msg.content,
    }));

    const current_message = messages[messages.length - 1].content;

    const payload = {
      chat_history:
        chat_history.length > 0
          ? chat_history
          : [{ role: "USER", message: "" }],
      message: current_message,
      model,
      ...options,
    };

    try {
      const response = await this.client.post(`/chat`, payload);

      return response && response.data && response.data.text
        ? response.data.text
        : null;
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

module.exports = Cohere;
