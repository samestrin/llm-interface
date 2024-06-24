/**
 * @file test/simple/groq.test.js
 * @description Simplified tests for the Groq API client.
 */

const Groq = require('../../src/interfaces/groq.js');
const { groqApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('Groq Simple', () => {
  if (groqApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof groqApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const groq = new Groq(groqApiKey);

      try {
        response = await groq.sendMessage(simplePrompt, options);
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
