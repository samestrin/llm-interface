/**
 * @file test/interfaces/cohere.test.js
 * @description Tests for the Cohere API client.
 */

const Cohere = require('../../src/interfaces/cohere.js');
const { cohereApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

let response = '';
let model = 'command-r';

describe('Cohere Interface', () => {
  if (cohereApiKey) {
    let response;

    test('API Key should be set', async () => {
      expect(typeof cohereApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const cohere = new Cohere(cohereApiKey);
      const message = {
        model,
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
      try {
        response = await cohere.sendMessage(message, options);
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }

      expect(typeof response).toStrictEqual('object');
    }, 30000);
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
