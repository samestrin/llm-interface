/**
 * @file friendliai.test.js
 * @description Simplified tests for the Friendli AI API client.
 */

const FriendliAI = require('../../src/interfaces/friendliai.js');
const { friendliaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('Friendli AI Simple', () => {
  if (friendliaiApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof friendliaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const friendliai = new FriendliAI(friendliaiApiKey);

      try {
        response = await friendliai.sendMessage(simplePrompt, options);
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
