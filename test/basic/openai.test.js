/**
 * @file test/basic/openai.test.js
 * @description Tests for the OpenAI API client.
 */

const OpenAI = require('../../src/interfaces/openai.js');
const { openaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
describe('OpenAI Basic', () => {
  if (openaiApiKey) {
    let response;

    test('API Key should be set', async () => {
      expect(typeof openaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const openai = new OpenAI(openaiApiKey);
      const message = {
        model: 'gpt-3.5-turbo',
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
      response = await openai.sendMessage(message, options);

      expect(typeof response).toBe('string');
    });

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
