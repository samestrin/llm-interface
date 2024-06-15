/**
 * @file rekate.test.js
 * @description Tests for the Reka AI API client.
 */

const Reka = require("../../src/reka");
const { rekaApiKey } = require("../../config");

test("Reka AI API Key should be set", async () => {
  expect(typeof rekaApiKey).toBe("string");
});

test("Reka AI API Client should send a message and receive a response", async () => {
  const reka = new Reka(rekaApiKey);
  const message = {
    model: "reka-core",
    messages: [
      {
        role: "user",
        content:
          "You are a helpful assistant. Say OK if you understand and stop.",
      },
      {
        role: "system",
        content: "OK",
      },
      {
        role: "user",
        content: "Explain the importance of low latency LLMs.",
      },
    ],
  };
  try {
    const response = await reka.sendMessage(message, {});

    expect(typeof response).toBe("string");
  } catch (error) {
    console.error("Test failed:", error);
    throw error;
  }
}, 30000);
