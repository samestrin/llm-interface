/**
 * @file test/basic/llmInterfaceSendMessageClass.setApiKey.test.js
 * @description Tests for the LLMInterfaceSendMessage class.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
const interfaces = require('./sharedInterfaceObject.js');
let response;

beforeAll(() => {
  LLMInterface.setApiKey(interfaces);
});

for (let [module, apiKey] of Object.entries(interfaces)) {
  describe(`LLMInterface.setApiKey("${module}")`, () => {
    if (apiKey) {
      let secondaryKey = false;
      if (Array.isArray(apiKey)) {
        [apiKey, secondaryKey] = apiKey;
      }

      test(`API Key should be set (string)`, () => {
        expect(typeof apiKey).toBe('string');
      });

      if (secondaryKey) {
        test(`Secondary Key (${module === 'cloudflareai' ? 'Account ID' : 'Space ID'}) should be set (string)`, () => {
          expect(typeof secondaryKey).toBe('string');
        });
      }

      test(`LLMInterface.sendMessage should send a message and receive a response after API key set with setApiKey `, async () => {
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
    } else {
      test.skip(`${module} API Key is not set`, () => {});
    }
  });
}
