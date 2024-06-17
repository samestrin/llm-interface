/**
 * @file huggingface.test.js
 * @description Tests for the Hugging Face Inference API client.
 */

const HuggingFace = require("../../src/huggingface");
const { huggingfaceApiKey } = require("../../config");

test("HuggingFace Inference API Key should be set", async () => {
  expect(typeof huggingfaceApiKey).toBe("string");
});

test("HuggingFace Inference API Client should send a message and receive a response", async () => {
  const huggingface = new HuggingFace(huggingfaceApiKey);
  const message = "Explain the importance of low latency LLMs.";
  try {
    const response = await huggingface.sendMessage(message, {
      max_tokens: 100,
    });

    expect(typeof response).toBe("string");
  } catch (error) {
    console.error("Test failed:", error);
    throw error;
  }
}, 30000);
