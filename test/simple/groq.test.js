/**
 * @file test/simple/groq.test.js
 * @description Simplified tests for the Groq API client.
 */

const Groq = require('../../src/interfaces/groq.js');
const { groqApiKey } = require('../../src/config/config.js');

test('Groq API Key should be set', async () => {
  expect(typeof groqApiKey).toBe('string');
});

test('Groq API Client should send a message and receive a response', async () => {
  const groq = new Groq(groqApiKey);
  const message = 'Explain the importance of low latency LLMs.';
  const response = await groq.sendMessage(message, { max_tokens: 100 });

  expect(typeof response).toBe('string');
});
