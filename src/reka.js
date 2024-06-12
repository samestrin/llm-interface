const axios = require("axios");

class RekaWrapper {
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

module.exports = RekaWrapper;
