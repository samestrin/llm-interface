/**
 * @file test/simple/sharedTestCases.js
 * @description Shared test cases for different AI interfaces.
 */

const { options, expectedMaxLength } = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

function delay(ms) {
  ms = ms * 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = function runTests(
  AIClient,
  apiKey,
  clientName,
  simplePrompt,
  delayBetweenTests = 0,
) {
  let aiClient;
  let delayBetweenTestsWithWait = 30000 + delayBetweenTests * 1000;

  describe(`${clientName} Simple`, () => {
    if (apiKey) {
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

      test(`Response should be less than ${expectedMaxLength} characters`, async () => {
        expect(response.results.length).toBeLessThan(expectedMaxLength);
      });
    } else {
      test.skip(`API Key is not set`, () => {});
    }
  });
};
