/**
 * @file anthropic.js
 * @class Anthropic
 * @description Wrapper class for the Anthropic API.
 * @param {string} apiKey - The API key for Anthropic.
 */

const AnthropicSDK = require("@anthropic-ai/sdk");

class Anthropic {
  constructor(apiKey) {
    this.anthropic = new AnthropicSDK({
      apiKey: apiKey,
    });
  }

  /**
   * Sends a message to the Anthropic API.
   * @param {Object} message - The message object to send.
   * @param {Object} [options] - Optional parameters.
   * @param {number} [options.max_tokens=150] - Maximum number of tokens.
   * @param {string} [options.model="claude-3-opus-20240229"] - The model to use.
   * @returns {Promise<string>} - The response text.
   * @throws {Error} - Throws an error if the API call fails.
   * @example
   * const response = await Anthropic.sendMessage({ messages: [{ role: 'user', content: 'Hello!' }] });
   */

  async sendMessage(message, options = {}) {
    const {
      max_tokens = 150,
      model = message.model || "claude-3-opus-20240229",
    } = options;

    // Convert all "system" roles to "assistant" and ensure messages alternate starting with "user"
    const convertedMessages = message.messages.map((msg, index) => {
      if (index === 0) {
        return { ...msg, role: "user" };
      }
      if (msg.role === "system") {
        return { ...msg, role: "assistant" };
      }
      return { ...msg, role: index % 2 === 0 ? "user" : "assistant" };
    });

    const params = {
      max_tokens,
      messages: convertedMessages,
      model,
    };

    try {
      const response = await this.anthropic.messages.create(params);
      return response &&
        response.content &&
        response.content[0] &&
        response.content[0].text
        ? response.content[0].text
        : null;
    } catch (error) {
      throw new Error(
        error.response ? error.response.data.error.message : error.message
      );
    }
  }
}

module.exports = Anthropic;
