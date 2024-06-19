/**
 * @file mistral.test.js
 * @description Simplified tests for the Mistral API client.
 */

const Mistral = require('../../src/interfaces/mistral.js');
const { mistralApiKey } = require('../../src/config/config.js');

test('Mistral API Key should be set', async () => {
  expect(typeof mistralApiKey).toBe('string');
});

test('Mistral API Client should send a message and receive a response', async () => {
  const mistral = new Mistral(mistralApiKey);
  const message = 'Explain the importance of low latency LLMs.';
  try {
    const response = await mistral.sendMessage(message, { max_tokens: 100 });

    expect(typeof response).toBe('string');
  } catch (error) {
    throw new Error(`Test failed: ${error}`);
  }
}, 30000);
