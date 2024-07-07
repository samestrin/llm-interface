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
  if (apiKey) {
    let secondaryKey = false;
    if (Array.isArray(apiKey)) {
      [apiKey, secondaryKey] = apiKey;
    }

    describe(`LLMInterface.embeddings("${module}")`, () => {
      test(`API Key should be set (string)`, () => {
        expect(typeof apiKey).toBe('string');
      });

      if (secondaryKey) {
        test(`Secondary Key (${module === 'cloudflareai' ? 'Account ID' : 'Space ID'}) should be set (string)`, () => {
          expect(typeof secondaryKey).toBe('string');
        });
      }

      test(`LLMInterface.embeddings should send a message and receive a response`, async () => {
        response = await LLMInterface.embeddings(module, simplePrompt, options);

        console.log(response);

        try {
        } catch (error) {
          throw new Error(`Test failed: ${safeStringify(error)}`);
        }
        expect(Array.isArray(response.results)).toStrictEqual(true);
      }, 30000);
    });
  } else {
    test.skip(`${module} API Key is not set`, () => {});
  }
}
