/**
 * @file test/simple/sharedTestCases.js
 * @description Shared test cases for different AI interfaces.
 */

const { options, expectedMaxLength } = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
const { delay } = require('../../src/utils/utils.js');

const interfaceSkip = ['ollama'];

module.exports = function runTests(
  AIClient,
  apiKey,
  interfaceName,
  simplePrompt,
  delayBetweenTests = 0,
  runMaxTokens = true,
) {
  let aiClient;
  let delayBetweenTestsWithWait = 30000 + delayBetweenTests;

  describe(`${interfaceName} Simple`, () => {
    if (apiKey && !interfaceSkip.includes(interfaceName)) {
      let response;
      test('API Key should be set', () => {
        expect(typeof apiKey === 'string' || Array.isArray(apiKey)).toBe(true);
      });

      test(
        'API Client (small) should send a message and receive a response',
        async () => {
          if (Array.isArray(apiKey)) {
            aiClient = new AIClient(apiKey[0], apiKey[1]);
          } else {
            aiClient = new AIClient(apiKey);
          }
          try {
            options.model = 'small';
            response = await aiClient.sendMessage(simplePrompt, options);
            if (delayBetweenTests > 0) await delay(delayBetweenTests);
          } catch (error) {
            throw new Error(`Test failed: ${safeStringify(error)}`);
          }
          expect(typeof response).toStrictEqual('object');
        },
        delayBetweenTestsWithWait,
      );

      test(
        'API Client (large) should send a message and receive a response',
        async () => {
          if (Array.isArray(apiKey)) {
            aiClient = new AIClient(apiKey[0], apiKey[1]);
          } else {
            aiClient = new AIClient(apiKey);
          }
          try {
            options.model = 'large';
            response = await aiClient.sendMessage(simplePrompt, options);
            if (delayBetweenTests > 0) await delay(delayBetweenTests);
          } catch (error) {
            throw new Error(`Test failed: ${safeStringify(error)}`);
          }
          expect(typeof response).toStrictEqual('object');
        },
        delayBetweenTestsWithWait,
      );

      test(
        'API Client (default) should send a message and receive a response',
        async () => {
          if (Array.isArray(apiKey)) {
            aiClient = new AIClient(apiKey[0], apiKey[1]);
          } else {
            aiClient = new AIClient(apiKey);
          }

          try {
            options.model = 'default';
            response = await aiClient.sendMessage(simplePrompt, options);
            if (delayBetweenTests > 0) await delay(delayBetweenTests);
          } catch (error) {
            throw new Error(`Test failed: ${safeStringify(error)}`);
          }
          expect(typeof response).toStrictEqual('object');
        },
        delayBetweenTestsWithWait,
      );
      if (runMaxTokens) {
        test(`Response should be less than ${expectedMaxLength} characters`, async () => {
          expect(response.results.length).toBeLessThan(expectedMaxLength);
        });
      } else {
        test.skip(`API does not support max_tokens`, () => { });
      }
    } else {
      test.skip(`API Key is not set`, () => { });
    }
  });
};
