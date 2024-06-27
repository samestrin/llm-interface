/**
 * @file test/basic/monsterapi.test.js
 * @description Tests for the MonsterAPI API client.
 */

const MonsterAPI = require('../../src/interfaces/monsterapi.js');
const { monsterapiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('MonsterAPI Basic', () => {
  if (monsterapiApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof monsterapiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const monsterapi = new MonsterAPI(monsterapiApiKey);
      const message = {
        model: 'TinyLlama/TinyLlama-1.1B-Chat-v1.0',
        messages: [
          {
            role: 'user',
            content: simplePrompt,
          },
        ],
      };

      try {
        response = await monsterapi.sendMessage(message, options);
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
