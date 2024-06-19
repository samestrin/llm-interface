/**
 * @file cohere.test.js
 * @description Tests for the Cohere API client.
 */

const Cohere = require("../../src/interfaces/cohere.js");
const { cohereApiKey } = require("../../src/config/config.js");

test("Cohere API Key should be set", async () => {
  expect(typeof cohereApiKey).toBe("string");
});

test("Cohere API Client should send a message and receive a response", async () => {
  const cohere = new Cohere(cohereApiKey);
  const message = {
    model: "command-r-plus",
    messages: [
      {
        role: "user",
        content: "Hello.",
      },
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: "Explain the importance of low latency LLMs.",
      },
    ],
  };
  const response = await cohere.sendMessage(message, { max_tokens: 100 });

  expect(typeof response).toBe("string");
}, 30000);
