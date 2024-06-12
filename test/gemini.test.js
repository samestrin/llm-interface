/**
 * @file gemini.test.js
 * @description Tests for the Gemini API client.
 */

const Gemini = require("../src/gemini"); // Adjust path as needed
const { geminiApiKey } = require("../config");

test("Gemini API Client should send a message and receive a response", async () => {
  expect(typeof geminiApiKey).toBe("string");

  const gemini = new Gemini(geminiApiKey);
  const message = {
    model: "gemini-1.5-flash",
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
  const response = await gemini.sendMessage(message, { max_tokens: 100 });
  console.log(response);
  expect(typeof response).toBe("string");
});
