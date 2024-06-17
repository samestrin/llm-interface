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
  const message = {
    model: "meta-llama/Meta-Llama-3-8B-Instruct",
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
    const response = await huggingface.sendMessage(message, {});

    expect(typeof response).toBe("string");
  } catch (error) {
    console.error("Test failed:", error);
    throw error;
  }
}, 30000);
