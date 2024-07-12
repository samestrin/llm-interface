/**
 * @file test/basic/llmInterface.sendMessageClass.test.js
 * @description Tests for the LLMInterfaceSendMessage class.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { delay } = require('../../src/utils/utils.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
const interfaces = require('./sharedInterfaceObject.js');
let response;

const openAiMessageTemplate = {
  messages: [{ role: 'user', content: 'Say this is a test!' }],
  temperature: 0.7,
};

const interfaceSkip = ['ollama', 'voyage'];
const interfaceDelays = ['ollama', 'corcel', 'watsonxai', 'cloudflareai', 'aimlapi', 'thebai'];

for (let [interfaceName, apiKey] of Object.entries(interfaces)) {
  if (apiKey && !interfaceSkip.includes(interfaceName)) {
    let secondaryKey = false;
    if (Array.isArray(apiKey)) {
      [apiKey, secondaryKey] = apiKey;
    }

    describe(`LLMInterface.sendMessage("${interfaceName}")`, () => {
      test(`API Key should be set (string)`, () => {
        expect(typeof apiKey).toBe('string');
      });

      if (secondaryKey) {
        test(`Secondary Key (${interfaceName === 'cloudflareai' ? 'Account ID' : 'Space ID'
          }) should be set (string)`, () => {
            expect(typeof secondaryKey).toBe('string');
          });
      }
      if (interfaceName !== 'voyage') {
        test(`LLMInterface.sendMessage with inline API key should send a message and receive a response`, async () => {
          try {
            if (!secondaryKey) {
              response = await LLMInterface.sendMessage(
                [interfaceName, apiKey],
                simplePrompt,
                options,
                { retryAttempts: 3 },
              );
            } else {
              response = await LLMInterface.sendMessage(
                [interfaceName, [apiKey, secondaryKey]],
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
          if (interfaceDelays.includes(interfaceName)) {
            await delay(5000);
          }

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

          expect(typeof response).toStrictEqual('object');
        }, 45000);

        test(`LLMInterface.sendMessage after inline API key, without API key should send a OpenAI style message and receive a response`, async () => {
          if (interfaceDelays.includes(interfaceName)) {
            await delay(5000);
          }

          try {
            let openAIMessage = { model: 'small', ...openAiMessageTemplate };

            response = await LLMInterface.sendMessage(
              interfaceName,
              openAIMessage,
              options,
              { retryAttempts: 3 },
            );
          } catch (error) {
            throw new Error(`Test failed: ${safeStringify(error)}`);
          }

          expect(typeof response).toStrictEqual('object');
        }, 45000);
      } else {
        test.skip(`${interfaceName} only supports embeddings.`, () => { });
      }
    });
  } else {
    test.skip(`${interfaceName} API Key is not set`, () => { });
  }
}
