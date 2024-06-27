/**
 * @file test/basic/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const DeepInfra = require('../../src/interfaces/deepinfra.js');
const { deepinfraApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('DeepInfra Basic', () => {
  if (deepinfraApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof deepinfraApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const deepinfra = new DeepInfra(deepinfraApiKey);
      const message = {
        model: 'microsoft/WizardLM-2-7B',
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
        response = await deepinfra.sendMessage(message, options);
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
