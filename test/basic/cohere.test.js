/**
 * @file test/basic/cohere.test.js
 * @description Tests for the Cohere API client.
 */

const Cohere = require('../../src/interfaces/cohere.js');
const { cohereApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');

describe('Cohere Basic', () => {
  if (cohereApiKey) {
    let response;

    test('API Key should be set', async () => {
      expect(typeof cohereApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const cohere = new Cohere(cohereApiKey);
      const message = {
        model: 'command-r-plus',
        messages: [
          {
            role: 'user',
            content: 'Hello.',
          },
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
      response = await cohere.sendMessage(message, options);

      expect(typeof response).toBe('string');
    }, 30000);
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
