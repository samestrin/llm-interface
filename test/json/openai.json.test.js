/**
 * @file openai.test.js
 * @description Tests for the OpenAI API client.
 */

const OpenAI = require("../../src/openai");
const { openaiApiKey } = require("../../src/config/config.js");

test("OpenAI API Key should be set", async () => {
  expect(typeof openaiApiKey).toBe("string");
});

test("OpenAI API Client should send a message and receive a response", async () => {
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
        content:
          "Explain the importance of low latency LLMs. Return the results as a JSON object. Follow this format: [{reason, reasonDescription}]",
      },
    ],
  };
  const response = await openai.sendMessage(message, {
    max_tokens: 100,
    response_format: "json_object",
  });

  expect(typeof response).toBe("object");
});
