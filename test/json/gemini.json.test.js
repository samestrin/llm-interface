/**
 * @file gemini.test.js
 * @description Tests for the Gemini API client.
 */

const Gemini = require("../../src/gemini");
const { geminiApiKey } = require("../../config");

test("Gemini API Key should be set", async () => {
  expect(typeof geminiApiKey).toBe("string");
});

test("Gemini API Client should send a message and receive a response", async () => {
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
        content:
          "Explain the importance of low latency LLMs. Return the results as a JSON object. Follow this format: [{reason, reasonDescription}]",
      },
    ],
  };
  const response = await gemini.sendMessage(message, {
    max_tokens: 100,
    response_format: "json_object",
  });
  expect(typeof response).toBe("object");
});
