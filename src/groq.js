/**
 * @file groq.js
 * @class Groq
 * @description Wrapper class for the Groq API.
 * @param {string} apiKey - The API key for Groq.
 */
const GroqSDK = require("groq-sdk");

class Groq {
  constructor(apiKey) {
    this.groq = new GroqSDK({
      apiKey: apiKey,
    });
  }

  /**
   * Sends a message to the Groq API.
   * @param {Object} message - The message object to send.
   * @param {Object} [options] - Optional parameters.
   * @param {number} [options.max_tokens=150] - Maximum number of tokens.
   * @param {string} [options.model="llama3-8b-8192"] - The model to use.
   * @returns {Promise<string>} - The response text.
   * @throws {Error} - Throws an error if the API call fails.
   * @example
   * const response = await groq.sendMessage({ messages: [{ role: 'user', content: 'Hello!' }] });
   */
  async sendMessage(message, options = {}) {
    const { max_tokens = 150, model = message.model || "llama3-8b-8192" } =
      options;

    const params = {
      model,
      messages: message.messages,
      max_tokens,
    };

    try {
      const chatCompletion = await this.groq.chat.completions.create(params);
      return chatCompletion &&
        chatCompletion.choices &&
        chatCompletion.choices[0] &&
        chatCompletion.choices[0].message &&
        chatCompletion.choices[0].message.content
        ? chatCompletion.choices[0].message.content
        : null;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
}

module.exports = Groq;
