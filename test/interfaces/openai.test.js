/**
 * @file test/interfaces/openai.test.js
 * @description Tests for the OpenAI API client.
 */

const OpenAI = require('../../src/interfaces/openai.js');
const { openaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

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
      try {
        response = await openai.sendMessage(message, options);
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }

      expect(typeof response).toStrictEqual('object');
    });

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
