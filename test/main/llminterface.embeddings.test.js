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

let interfaceSkip = [];
const interfaceDelays = [
  'ollama',
  'corcel',
  'watsonxai',
  'cloudflareai',
  'aimlapi',
];
for (let [interfaceName, apiKey] of Object.entries(interfaces)) {
  if (apiKey && !interfaceSkip.includes(interfaceName)) {
    let secondaryKey = false;
    if (Array.isArray(apiKey)) {
      [apiKey, secondaryKey] = apiKey;
    }

    describe(`LLMInterface.embeddings("${interfaceName}")`, () => {
      test(`API Key should be set (string)`, () => {
        expect(typeof apiKey).toBe('string');
      });

      if (secondaryKey) {
        test(`Secondary Key (${
          interfaceName === 'cloudflareai' ? 'Account ID' : 'Space ID'
        }) should be set (string)`, () => {
          expect(typeof secondaryKey).toBe('string');
        });
      }

      const embeddingsSupport = LLMInterface.getInterfaceConfigValue(
        interfaceName,
        'hasEmbeddings',
      );

      if (embeddingsSupport) {
        test(`LLMInterface.embeddings should send a message and receive a response`, async () => {
          response = await LLMInterface.embeddings(
            interfaceName,
            simplePrompt,
            options,
          );
          try {
          } catch (error) {
            throw new Error(`Test failed: ${safeStringify(error)}`);
          }
          expect(Array.isArray(response.results)).toStrictEqual(true);
          if (interfaceDelays.includes(interfaceName)) {
            delay(5000);
          }
        }, 30000);
      } else {
        test.skip(`${interfaceName} does not support embeddings`, () => {});
      }
    });
  } else {
    test.skip(`${interfaceName} is having embeddings issues and is skipped`, () => {});
  }
}
