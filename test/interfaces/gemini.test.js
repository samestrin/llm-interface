/**
 * @file test/interfaces/gemini.test.js
 * @description Tests for the Gemini API client.
 */

const Gemini = require('../../src/interfaces/gemini.js');
const { geminiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('Gemini Basic', () => {
  if (geminiApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof geminiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const gemini = new Gemini(geminiApiKey);
      const message = {
        model: 'gemini-1.5-flash',
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
        response = await gemini.sendMessage(message, options);

        expect(typeof response).toStrictEqual('object');
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }
    });
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
