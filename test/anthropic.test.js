/**
 * @file anthropic.test.js
 * @description Tests for the Anthropic API client.
 */

const AnthropicWrapper = require("../src/anthropic"); // Adjust path as needed
const { anthropicApiKey } = require("../config");

test("Anthropic API Client should send a message and receive a response", async () => {
  expect(typeof anthropicApiKey).toBe("string");

  const anthropic = new AnthropicWrapper(anthropicApiKey);
  const message = {
    model: "claude-3-opus-20240229",
    messages: [
      {
        role: "user",
        content: "Write me a short story about trees.",
      },
    ],
  };

  const response = await anthropic.sendMessage(message, { max_tokens: 150 });
  console.log(response);
  expect(typeof response).toBe("string");
}, 30000); // Extend timeout to 30 seconds
