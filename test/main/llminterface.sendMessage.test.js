/**
 * @file test/basic/llmInterfaceSendMessageClass.test.js
 * @description Tests for the LLMInterfaceSendMessage class.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
const interfaces = require('./sharedInterfaceObject.js');
let response;

for (let [module, apiKey] of Object.entries(interfaces)) {
  if (apiKey) {
    let secondaryKey = false;
    if (Array.isArray(apiKey)) {
      [apiKey, secondaryKey] = apiKey;
    }

    describe(`LLMInterface.sendMessage("${module}")`, () => {
      test(`API Key should be set (string)`, () => {
        expect(typeof apiKey).toBe('string');
      });

      if (secondaryKey) {
        test(`Secondary Key (${module === 'cloudflareai' ? 'Account ID' : 'Space ID'}) should be set (string)`, () => {
          expect(typeof secondaryKey).toBe('string');
        });
      }

      test(`LLMInterface.sendMessage with inline API key should send a message and receive a response`, async () => {
        try {
          if (!secondaryKey) {
            response = await LLMInterface.sendMessage(
              [module, apiKey],
              simplePrompt,
              options,
              { retryAttempts: 3 },
            );
          } else {
            response = await LLMInterface.sendMessage(
              [module, [apiKey, secondaryKey]],
              simplePrompt,
              options,
              { retryAttempts: 3 },
            );
          }
        } catch (error) {
          throw new Error(`Test failed: ${safeStringify(error)}`);
        }
        expect(typeof response).toStrictEqual('object');
      }, 30000);

      test(`LLMInterface.sendMessage after inline API key, without API key should send a message and receive a response`, async () => {
        try {
          response = await LLMInterface.sendMessage(
            module,
            simplePrompt,
            options,
            { retryAttempts: 3 },
          );
        } catch (error) {
          throw new Error(`Test failed: ${safeStringify(error)}`);
        }

        expect(typeof response).toStrictEqual('object');
      }, 30000);
    });
  } else {
    test.skip(`${module} API Key is not set`, () => {});
  }
}
