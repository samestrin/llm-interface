/**
 * @file test/basic/huggingface.test.js
 * @description Tests for the Hugging Face Inference API client.
 */

const HuggingFace = require('../../src/interfaces/huggingface.js');
const { huggingfaceApiKey } = require('../../src/config/config.js');
const { safeStringify } = require('../utils/jest-serializer.js');

test('HuggingFace Inference API Key should be set', async () => {
  expect(typeof huggingfaceApiKey).toBe('string');
});

test('HuggingFace Inference API Client should send a message and receive a response', async () => {
  const huggingface = new HuggingFace(huggingfaceApiKey);
  const message = {
    model: 'meta-llama/Meta-Llama-3-8B-Instruct',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: 'Explain the importance of low latency LLMs.',
      },
    ],
  };
  try {
    const response = await huggingface.sendMessage(message, {});

    expect(typeof response).toBe('string');
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
}, 30000);
