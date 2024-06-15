/**
 * @file mistral.js
 * @description Wrapper class for the Mistral API.
 * @param {string} apiKey - The API key for Mistral.
 */

const axios = require("axios");

class Mistral {
  /**
   * Creates an instance of the Mistral class.
   *
   * @constructor
   * @param {string} apiKey - The API key for Mistral.
   */
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: "https://api.mistral.ai/v1",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Sends a message to the Mistral API and returns the response.
   *
   * @param {Object} message - The message object containing model and messages.
   * @param {string} message.model - The model to use for the request.
   * @param {Array<Object>} message.messages - The array of message objects to form the prompt.
   * @param {Object} [options] - Optional parameters for the request.
   * @param {number} [options.max_tokens] - Maximum number of tokens to generate.
   * @returns {Promise<string>} The response text from the API.
   * @throws {Error} Throws an error if the request fails.
   *
   * @example
   * const message = {
   *   model: "mistral-large-latest",
   *   messages: [
   *     { role: "system", content: "You are a helpful assistant." },
   *     { role: "user", content: "Explain the importance of low latency LLMs." }
   *   ],
   * };
   * mistral.sendMessage(message, { max_tokens: 100 })
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   */
  async sendMessage(message, options = {}) {
    const { model, messages } = message;

    const payload = {
      model,
      messages,
      ...options,
    };

    try {
      const response = await this.client.post(`/chat/completions`, payload);

      return response &&
        response.data &&
        response.data.choices &&
        response.data.choices[0] &&
        response.data.choices[0].message &&
        response.data.choices[0].message.content
        ? response.data.choices[0].message.content
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

module.exports = Mistral;
