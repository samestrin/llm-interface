/**
 * @file test/basic/gemini.test.js
 * @description Tests for the Gemini API client.
 */

const Gemini = require('../../src/interfaces/gemini.js');
const { geminiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
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
      response = await gemini.sendMessage(message, options);

      expect(typeof response).toBe('string');
    });
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
