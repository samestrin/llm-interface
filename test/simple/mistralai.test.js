/**
 * @file mistralai.test.js
 * @description Simplified tests for the MistralAI API client.
 */

const MistralAI = require('../../src/interfaces/mistralai.js');
const { mistralaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
describe('MistralAI Simple', () => {
  if (mistralaiApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof mistralaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const mistralai = new MistralAI(mistralaiApiKey);

      try {
        response = await mistralai.sendMessage(simplePrompt, options);

        expect(typeof response).toStrictEqual('object');
      } catch (error) {
        throw new Error(`Test failed: ${error}`);
      }
    }, 30000);
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
