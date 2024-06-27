/**
 * @file test/basic/friendliai.test.js
 * @description Tests for the FriendliAI API client.
 */

const FriendliAI = require('../../src/interfaces/friendliai.js');
const { friendliaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('FriendliAI Basic', () => {
  if (friendliaiApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof friendliaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const friendliai = new FriendliAI(friendliaiApiKey);
      const message = {
        model: 'meta-llama-3-8b-instruct',
        messages: [
          {
            role: 'user',
            content: simplePrompt,
          },
        ],
      };

      try {
        response = await friendliai.sendMessage(message, options);
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
