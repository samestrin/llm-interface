/**
 * @file llamacpp.js
 * @class LlamaCPP
 * @description Wrapper class for the LlamaCPP API.
 * @param {string} llamacppURL - The URL for the LlamaCPP API.
 */

const axios = require("axios");

class LlamaCPP {
  constructor(llamacppURL) {
    this.client = axios.create({
      baseURL: llamacppURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  /**
   * Sends a message to the LlamaCPP API.
   * @param {Object} prompt - The prompt object to send.
   * @param {Object} [options] - Optional parameters.
   * @param {number} [options.max_tokens=150] - Maximum number of tokens.
   * @returns {Promise<string>} - The response text.
   * @throws {Error} - Throws an error if the API call fails.
   * @example
   * const response = await llamaCPP.sendMessage({ messages: [{ role: 'user', content: 'Hello!' }] });
   */
  async sendMessage(prompt, options = {}) {
    const { max_tokens = 150 } = options;
    try {
      const formattedPrompt = prompt.messages
        .map((message) => message.content)
        .join(" ");

      const response = await this.client.post("", {
        prompt: formattedPrompt,
        n_predict: max_tokens,
      });

      let contents;
      if (response.data.content) {
        contents = response.data.content;
      } else if (response.data.results) {
        contents = response.data.results.map((result) => result.content).join();
      } else {
        contents = "";
      }

      return contents;
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

module.exports = LlamaCPP;
