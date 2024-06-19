/**
 * @file basic/perplexity.test.js
 * @description Tests for the Perplexity API client.
 */

const Perplexity = require('../../src/interfaces/perplexity.js');
const { perplexityApiKey } = require('../../src/config/config.js');

test('Perplexity Labs API Key should be set', () => {
  expect(typeof perplexityApiKey).toBe('string');
});

test('Perplexity Labs API Client should send a message and receive a response', async () => {
  const perplixity = new Perplexity(perplexityApiKey);
  const message = {
    model: 'llama-3-sonar-small-32k-online',
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
  const response = await perplixity.sendMessage(message, { max_tokens: 100 });

  expect(typeof response).toBe('string');
});
