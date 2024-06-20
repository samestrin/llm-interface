/**
 * @file test/basic/llamacpp.test.js
 * @description Tests for the LlamaCPP API client.
 */

const LlamaCPP = require('../../src/interfaces/llamacpp.js');
const { llamaURL } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const axios = require('axios');
describe('LlamaCPP Basic', () => {
  if (llamaURL) {
    let response;

    test('URL should be set', async () => {
      expect(typeof llamaURL).toBe('string');
    });

    test('URL loading test', async () => {
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

    test('API Client should send a message and receive a response', async () => {
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
            content: simplePrompt,
          },
        ],
      };
      response = await llamacpp.sendMessage(message, options);

      expect(typeof response).toStrictEqual('object');
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
