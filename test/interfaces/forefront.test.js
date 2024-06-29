/**
 * @file test/interfaces/forefront.test.js
 * @description Tests for the Forefront API client.
 */

const Forefront = require('../../src/interfaces/forefront.js');
const { forefrontApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

let response = '';
let model = 'forefront/Mistral-7B-Instruct-v0.2-chatml';

describe('Forefront Interface', () => {
  if (forefrontApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof forefrontApiKey).toBe('string');
    });
    jest;
    test('API Client should send a message and receive a response', async () => {
      const forefront = new Forefront(forefrontApiKey);
      const message = {
        model,
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
        response = await forefront.sendMessage(message, options);
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
