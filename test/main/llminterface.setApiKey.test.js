/**
 * @file test/basic/llmInterface.setApiKey.test.js
 * @description Tests for the LLMInterfaceSendMessage class.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
const { delay } = require('../../src/utils/utils.js');
const interfaces = require('./sharedInterfaceObject.js');
let response;

const interfaceSkip = ['ollama', 'voyage'];
const interfaceDelays = ['ollama', 'corcel', 'watsonxai', 'cloudflareai', 'aimlapi'];

beforeAll(() => {
  LLMInterface.setApiKey(interfaces);
});

for (let [interfaceName, apiKey] of Object.entries(interfaces)) {
  describe(`LLMInterface.setApiKey("${interfaceName}")`, () => {
    if (apiKey && !interfaceSkip.includes(interfaceName)) {
      let secondaryKey = false;
      if (Array.isArray(apiKey)) {
        [apiKey, secondaryKey] = apiKey;
      }

      test(`API Key should be set (string)`, () => {
        expect(typeof apiKey).toBe('string');
      });

      if (secondaryKey) {
        test(`Secondary Key (${interfaceName === 'cloudflareai' ? 'Account ID' : 'Space ID'
          }) should be set (string)`, () => {
            expect(typeof secondaryKey).toBe('string');
          });
      }

      test(`LLMInterface.sendMessage should send a message and receive a response after API key set with setApiKey `, async () => {
        try {
          response = await LLMInterface.sendMessage(
            interfaceName,
            simplePrompt,
            options,
            { retryAttempts: 3 },
          );
        } catch (error) {
          throw new Error(`Test failed: ${safeStringify(error)}`);
        }
        if (interfaceDelays.includes(interfaceName)) {
          await delay(5000);
        }
        expect(typeof response).toStrictEqual('object');
      }, 30000);
    } else {
      test.skip(`${interfaceName} API Key is not set`, () => { });
    }
  });
}
