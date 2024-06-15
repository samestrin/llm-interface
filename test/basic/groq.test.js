/**
 * @file groq.test.js
 * @description Tests for the Groq API client.
 */

const Groq = require("../../src/groq");
const { groqApiKey } = require("../../config");

test("Groq API Key should be set", async () => {
  expect(typeof groqApiKey).toBe("string");
});

test("Groq API Client should send a message and receive a response", async () => {
  const groq = new Groq(groqApiKey);
  const message = {
    model: "llama3-8b-8192",
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
  const response = await groq.sendMessage(message, { max_tokens: 100 });

  expect(typeof response).toBe("string");
});
