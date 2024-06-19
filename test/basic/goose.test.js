/**
 * @file test/basic/goose.test.js
 * @description Tests for the Goose AI API client.
 */

const Goose = require('../../src/interfaces/goose.js');
const { gooseApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
describe('Goose AI Basic', () => {
  if (gooseApiKey) {
    let response;

    test('API Key should be set', async () => {
      expect(typeof gooseApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const goose = new Goose(gooseApiKey);
      const message = {
        model: 'gpt-neo-20b',
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
      response = await goose.sendMessage(message, options);

      expect(typeof response).toBe('string');
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
