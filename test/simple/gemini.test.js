/**
 * @file test/simple/gemini.test.js
 * @description Simplified tests for the Gemini API client.
 */

const Gemini = require('../../src/interfaces/gemini.js');
const { geminiApiKey } = require('../../src/config/config.js');

test('Gemini API Key should be set', async () => {
  expect(typeof geminiApiKey).toBe('string');
});

test('Gemini API Client should send a message and receive a response', async () => {
  const gemini = new Gemini(geminiApiKey);
  const message = 'Explain the importance of low latency LLMs.';
  const response = await gemini.sendMessage(message, { max_tokens: 100 });

  expect(typeof response).toBe('string');
});
