/**
 * @file anthropic.test.js
 * @description Tests for the Anthropic API client.
 */

const Anthropic = require('../../src/anthropic');
const { anthropicApiKey } = require('../../src/config/config.js');

test('Anthropic API Key should be set', async () => {
  expect(typeof anthropicApiKey).toBe('string');
});

test('Anthropic API Client should send a message and receive a response', async () => {
  const anthropic = new Anthropic(anthropicApiKey);
  const message = 'Explain the importance of low latency LLMs.';
  try {
    const response = await anthropic.sendMessage(message, { max_tokens: 100 });
    expect(typeof response).toBe('string');
  } catch (error) {
    throw new Error(`Test failed: ${safeStringify(error)}`);
  }
}, 30000);
