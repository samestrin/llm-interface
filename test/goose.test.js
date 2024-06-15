/**
 * @file goose.test.js
 * @description Tests for the Goose AI API client.
 */

const Goose = require("../src/goose"); // Adjust path as needed
const { gooseApiKey } = require("../config");

test("Goose API Client should send a message and receive a response", async () => {
  expect(typeof gooseApiKey).toBe("string");

  const goose = new Goose(gooseApiKey);
  const message = {
    model: "gpt-neo-20b",
    messages: [
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

  const response = await goose.sendMessage(message, { max_tokens: 100 });
  expect(typeof response).toBe("string");
}, 30000); // Extend timeout to 30 seconds
