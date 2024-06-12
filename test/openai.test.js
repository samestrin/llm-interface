/**
 * @file openai.test.js
 * @description Tests for the OpenAI API client.
 */

const OpenAI = require("../src/openai"); // Adjust path as needed
const { openaiApiKey } = require("../config");

test("OpenAI API Client should send a message and receive a response", async () => {
  expect(typeof openaiApiKey).toBe("string");

  const openai = new OpenAI(openaiApiKey);
  const message = {
    model: "gpt-3.5-turbo",
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

  const response = await openai.sendMessage(message, { max_tokens: 100 });
  console.log(response);
  expect(typeof response).toBe("string");
});
