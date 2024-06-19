/**
 * @file test/basic/anthropic.test.js
 * @description Tests for the Anthropic API client.
 */

const Anthropic = require('../../src/interfaces/anthropic.js');
const { anthropicApiKey } = require('../../src/config/config.js');
const { safeStringify } = require('../utils/jest-serializer.js'); // Adjust the path if necessary

test('Anthropic API Key should be set', async () => {
  expect(typeof anthropicApiKey).toBe('string');
});

test('Anthropic API Client should send a message and receive a response', async () => {
  const anthropic = new Anthropic(anthropicApiKey);
  const message = {
    model: 'claude-3-opus-20240229',
    messages: [
      {
        role: 'user',
        content:
          'You are a helpful assistant. Say OK if you understand and stop.',
      },
      {
        role: 'system',
        content: 'OK',
      },
      {
        role: 'user',
        content: 'Explain the importance of low latency LLMs.',
      },
    ],
  };

  try {
    const response = await anthropic.sendMessage(message, { max_tokens: 100 });

    expect(typeof response).toBe('string');
  } catch (error) {
    throw new Error(`Test failed: ${safeStringify(error)}`);
  }
}, 30000);
