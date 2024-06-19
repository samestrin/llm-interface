/**
 * @file test/basic/llamacpp.test.js
 * @description Tests for the LlamaCPP API client.
 */

const LlamaCPP = require('../../src/interfaces/llamacpp.js');
const { llamaURL } = require('../../src/config/config.js');
const axios = require('axios');
const url = require('url');

test('LlamaCPP URL should be set', async () => {
  expect(typeof llamaURL).toBe('string');
});

test('LlamaCPP URL loading test', async () => {
  try {
    const fullUrl = llamaURL;
    const parsedUrl = new URL(fullUrl);

    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${
      parsedUrl.port ? ':' + parsedUrl.port : ''
    }/`;

    const response = await axios.get(baseUrl);

    expect(response.status).toBe(200);
    expect(response.data).toContain('<h1>llama.cpp</h1>');
  } catch (error) {
    throw new Error(`Failed to load URL: ${error.message}`);
  }
});

test('LlamaCPP API Client should send a message and receive a response', async () => {
  const llamacpp = new LlamaCPP(llamaURL);
  const message = {
    model: 'some-llamacpp-model',
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
  const response = await llamacpp.sendMessage(message, { max_tokens: 100 });

  expect(typeof response).toBe('string');
}, 30000);
