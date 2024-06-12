/**
 * @file groq.test.js
 * @description Tests for the Groq API client.
 */

const GroqWrapper = require("../src/groq"); // Adjust path as needed
const { groqApiKey } = require("../config");

test("Groq API Client should send a message and receive a response", async () => {
  expect(typeof groqApiKey).toBe("string");

  const groq = new GroqWrapper(groqApiKey);
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
  console.log(response);
  expect(typeof response).toBe("string");
});
