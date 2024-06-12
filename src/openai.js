/**
 * @file openai.js
 * @class OpenAI
 * @description Wrapper class for the OpenAI API.
 * @param {string} apiKey - The API key for OpenAI.
 */

const { OpenAI: OpenAIClient } = require("openai");

class OpenAI {
  constructor(apiKey) {
    this.openai = new OpenAIClient({
      apiKey: apiKey,
    });
  }

  /**
   * Sends a message to the OpenAI API.
   * @param {Object} message - The message object to send.
   * @param {Object} [options] - Optional parameters.
   * @param {number} [options.max_tokens=150] - Maximum number of tokens.
   * @param {string} [options.model="gpt-3.5-turbo-0613"] - The model to use.
   * @returns {Promise<string>} - The response text.
   * @throws {Error} - Throws an error if the API call fails.
   * @example
   * const response = await openAI.sendMessage({ messages: [{ role: 'user', content: 'Hello!' }] });
   */
  async sendMessage(message, options = {}) {
    // Extract values from message object
    const { model: messageModel, messages } = message;

    // Use options to overwrite model and max_tokens if provided
    const { max_tokens = 150, model = messageModel || "gpt-3.5-turbo-0613" } =
      options;

    try {
      const completion = await this.openai.chat.completions.create({
        model,
        messages,
        max_tokens,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
}

module.exports = OpenAI;
