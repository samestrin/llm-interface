/**
 * @file reka.test.js
 * @description Simplified test for the Reka AI API client.
 */

const RekaAI = require('../../src/interfaces/rekaai.js');
const { rekaaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('RekaAI Simple', () => {
  if (rekaaiApiKey) {
    let response;

    test('API Key should be set', async () => {
      expect(typeof rekaaiApiKey).toBe('string');
    });

    test('Client should send a message and receive a response', async () => {
      const reka = new RekaAI(rekaaiApiKey);

      try {
        response = await reka.sendMessage(simplePrompt, options);

        expect(typeof response).toStrictEqual('object');
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }
    }, 30000);
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
