/**
 * @file test/basic/llmInterfaceSendMessageFunction.test.js
 * @description Tests for the LLMInterfaceSendMessage function.
 */

const { LLMInterfaceSendMessage } = require('../../src/index.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
const { delay } = require('../../src/utils/utils.js');
const interfaces = require('./sharedInterfaceObject.js');
let response;

const interfaceSkip = ['ollama', 'voyage'];
const interfaceDelays = ['ollama', 'corcel', 'watsonxai', 'cloudflareai', 'aimlapi', 'thebai'];

for (let [interfaceName, apiKey] of Object.entries(interfaces)) {
  if (apiKey && !interfaceSkip.includes(interfaceName)) {

    let secondaryKey = false;
    if (apiKey && Array.isArray(apiKey)) {
      [apiKey, secondaryKey] = apiKey;
    }

    describe(`LLMInterfaceSendMessage("${interfaceName}")`, () => {
      test(`API Key should be set (string)`, () => {
        expect(typeof apiKey).toBe('string');
      });

      if (secondaryKey) {
        test(`Secondary Key (${interfaceName === 'cloudflareai' ? 'Account ID' : 'Space ID'}) should be set (string)`, () => {
          expect(typeof secondaryKey).toBe('string');
        });
      }

      test(`LLMInterfaceSendMessage should send a message and receive a response`, async () => {
        try {
          response = await LLMInterfaceSendMessage(
            interfaceName,
            !secondaryKey ? apiKey : [apiKey, secondaryKey],
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

    });
  } else {
    test.skip(`${interfaceName} API Key is not set`, () => { });
  }
}
