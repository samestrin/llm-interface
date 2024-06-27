/**
 * @file test/interfaces/octoai.test.js
 * @description Tests for the OctoAI Studio API client.
 */

const OctoAI = require('../../src/interfaces/octoai.js');
const { octoaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('OctoAI Basic', () => {
  if (octoaiApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof octoaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const octoai = new OctoAI(octoaiApiKey);
      const message = {
        model: 'mistral-7b-instruct',
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
        response = await octoai.sendMessage(message, options);
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
