/**
 * @file test/interfaces/anthropic.test.js
 * @description Tests for the Anthropic API client.
 */

const Anthropic = require('../../src/interfaces/anthropic.js');
const { anthropicApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('Anthropic Basic', () => {
  if (anthropicApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof anthropicApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const anthropic = new Anthropic(anthropicApiKey);
      const message = {
        model: 'claude-3-opus-20240229',
        messages: [
          {
            role: 'user',
            content:
              'You are a helpful assistant. Say OK if you understand and stop.',
          },
          {
            role: 'system',
            content: 'OK',
          },
          {
            role: 'user',
            content: simplePrompt,
          },
        ],
      };

      try {
        response = await anthropic.sendMessage(message, options);

        expect(typeof response).toStrictEqual('object');
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
