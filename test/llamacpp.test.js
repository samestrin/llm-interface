/**
 * @file llamacpp.test.js
 * @description Tests for the LlamaCPP API client.
 */

const LlamaCPP = require("../src/llamacpp"); // Adjust path as needed
const { llamaURL } = require("../config");

test("LlamaCPP API Client should send a message and receive a response", async () => {
  expect(typeof llamaURL).toBe("string");

  const llamacpp = new LlamaCPP(llamaURL);
  const message = {
    model: "some-llamacpp-model",
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

  const response = await llamacpp.sendMessage(message, { max_tokens: 100 });
  console.log(response);
  expect(typeof response).toBe("string");
}, 30000); // Extend timeout to 30 seconds
