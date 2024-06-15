/**
 * @file goose.js
 * @class Goose
 * @description Wrapper class for the Goose AI API.
 * @param {string} apiKey - The API key for Goose AI.
 */

const axios = require("axios");

class Goose {
  /**
   * Creates an instance of the Goose class.
   *
   * @constructor
   * @param {string} apiKey - The API key for Goose AI.
   */
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: "https://api.goose.ai/v1/engines",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
  }

  /**
   * Sends a message to the Goose AI API and returns the response.
   *
   * @param {Object} message - The message object containing model and messages.
   * @param {string} message.model - The model to use for the request.
   * @param {Array<Object>} message.messages - The array of message objects to form the prompt.
   * @param {Object} [options] - Optional parameters for the request.
   * @returns {Promise<Array<string>>} The response text from the API.
   * @throws {Error} Throws an error if the request fails.
   *
   * @example
   * const message = {
   *   model: "gpt-neo-20b",
   *   messages: [
   *     { role: "system", content: "You are a helpful assistant." },
   *     { role: "user", content: "Explain the importance of low latency LLMs." }
   *   ],
   * };
   * goose.sendMessage(message, { max_tokens: 100 })
   *   .then(response => console.log(response))
   *   .catch(error => console.error(error));
   */
  async sendMessage(message, options = {}) {
    const { model, messages } = message;

    // Convert messages array to a single prompt string
    const formattedPrompt = messages
      .map((message) => message.content)
      .join(" ");

    const payload = {
      prompt: formattedPrompt,
      ...options,
    };

    try {
      const url = `https://api.goose.ai/v1/engines/${model}/completions`;
      const response = await this.client.post(url, payload);
      const responseText =
        response &&
        response.data &&
        response.data.choices &&
        response.data.choices[0] &&
        response.data.choices[0].text
          ? response.data.choices[0].text.trim()
          : null;

      return responseText;
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

module.exports = Goose;
