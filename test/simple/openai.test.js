/**
 * @file openai.test.js
 * @description Simplified tests for the OpenAI API client.
 */

const OpenAI = require('../../src/interfaces/openai.js');
const { openaiApiKey } = require('../../src/config/config.js');

test('OpenAI API Key should be set', async () => {
  expect(typeof openaiApiKey).toBe('string');
});

test('OpenAI API Client should send a message and receive a response', async () => {
  const openai = new OpenAI(openaiApiKey);
  const message = 'Explain the importance of low latency LLMs.';
  const response = await openai.sendMessage(message, {
    max_tokens: 100,
    model: 'gpt-3.5-turbo',
  });
  expect(typeof response).toBe('string');
});
