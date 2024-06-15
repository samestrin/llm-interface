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
   * @param {string} [options.response_format=""] - The response format to use.
   * @returns {Promise<string>} - The response text.
   * @throws {Error} - Throws an error if the API call fails.
   * @example
   * const response = await openAI.sendMessage({ messages: [{ role: 'user', content: 'Hello!' }] });
   */
  async sendMessage(message, options = {}) {
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

    try {
      const completion = await this.openai.chat.completions.create(
        requestPayload
      );
      return completion &&
        completion.choices &&
        completion.choices[0] &&
        completion.choices[0].message &&
        completion.choices[0].message.content
        ? completion.choices[0].message.content
        : null;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
}

module.exports = OpenAI;
