/**
 * @file test/basic/reka.test.js
 * @description Tests for the Reka AI API client.
 */

const Reka = require('../../src/interfaces/reka.js');
const { rekaApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
describe('Reka Basic', () => {
  if (rekaApiKey) {
    let response;

    test('API Key should be set', async () => {
      expect(typeof rekaApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const reka = new Reka(rekaApiKey);
      const message = {
        model: 'reka-core',
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
        response = await reka.sendMessage(message, options);
        expect(typeof response).toStrictEqual('object');
      } catch (error) {
        console.error('Test failed:', error);
        throw error;
      }
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
