/**
 * @file test/basic/anthropic.test.js
 * @description Tests for the Anthropic API client.
 */

const AI21 = require('../../src/interfaces/ai21.js');
const { ai21ApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('AI21 Basic', () => {
  if (ai21ApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof ai21ApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const ai21 = new AI21(ai21ApiKey);
      const message = {
        model: 'jamba-instruct',
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

      try { response = await ai21.sendMessage(message, options);} catch (error) {
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
