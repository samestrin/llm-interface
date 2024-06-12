/**
 * @file gemini.js
 * @class Gemini
 * @description Wrapper class for the Gemini API.
 * @param {string} apiKey - The API key for Gemini.
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");

class Gemini {
  constructor(apiKey) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  /**
   * Converts input data structure for the Gemini API.
   * @param {Object} input - The input message object.
   * @param {number} max_tokens - The maximum number of tokens.
   * @returns {Object} - The converted data structure.
   */
  convertDataStructure(input, max_tokens) {
    let history = input.messages.slice(0, -1).map((message) => ({
      role: message.role,
      parts: [{ text: message.content }],
    }));

    // Ensure the first element's role is 'user'
    if (history.length > 0 && history[0].role !== "user") {
      history[0].role = "user";
    }

    const prompt = input.messages[input.messages.length - 1].content;

    return {
      history,
      prompt,
      generationConfig: {
        maxOutputTokens: max_tokens,
      },
    };
  }

  /**
   * Sends a message to the Gemini API.
   * @param {Object} message - The message object to send.
   * @param {Object} [options] - Optional parameters.
   * @param {number} [options.max_tokens=150] - Maximum number of tokens.
   * @param {string} [options.model="gemini-1.5-flash"] - The model to use.
   * @returns {Promise<string>} - The response text.
   * @throws {Error} - Throws an error if the API call fails.
   * @example
   * const response = await gemini.sendMessage({ messages: [{ role: 'user', content: 'Hello!' }] });
   */
  async sendMessage(message, options = {}) {
    const { max_tokens = 150, model = message.model || "gemini-1.5-flash" } =
      options;

    const { history, prompt, generationConfig } = this.convertDataStructure(
      message,
      max_tokens
    );

    try {
      const modelInstance = this.genAI.getGenerativeModel({ model });
      const chat = modelInstance.startChat({ history, generationConfig });

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      const text = await response.text(); // Ensure response.text() is awaited
      return text;
    } catch (error) {
      throw new Error(`Gemini API error: ${error.message}`);
    }
  }
}

module.exports = Gemini;
