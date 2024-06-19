const AI21 = require("../../src/interfaces/ai21.js");
const { ai21ApiKey } = require("../../src/config/config.js");

test("AI21 API Key should be set", () => {
  expect(typeof ai21ApiKey).toBe("string");
});

test("AI21 API Client should send a message and receive a response", async () => {
  const ai21 = new AI21(ai21ApiKey);
  const message = {
    model: "jamba-instruct",
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
  const options = {
    max_tokens: 200,
  };
  const response = await ai21.sendMessage(message, options);

  expect(typeof response).toBe("string");
});
