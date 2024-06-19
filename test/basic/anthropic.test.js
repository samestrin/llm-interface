/**
 * @file test/basic/anthropic.test.js
 * @description Tests for the Anthropic API client.
 */

const Anthropic = require('../../src/interfaces/anthropic.js');
const { anthropicApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
const { safeStringify } = require('../utils/jestSerializer.js'); // Adjust the path if necessary

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

        expect(typeof response).toBe('string');
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
