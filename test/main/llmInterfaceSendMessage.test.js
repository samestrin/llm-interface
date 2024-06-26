/**
 * @file test/basic/llmInterfaceSendMessage.test.js
 * @description Tests for the LLMInterfaceSendMessage function.
 */

const { LLMInterfaceSendMessage } = require('../../src/index.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

let config = require('../../src/config/config.js');

let modules = {
  openai: config.openaiApiKey,
  anthropic: config.anthropicApiKey,
  gemini: config.geminiApiKey,
  llamacpp: config.llamaURL,
  rekaai: config.rekaaiApiKey,
  groq: config.groqApiKey,
  gooseai: config.gooseaiApiKey,
  cohere: config.cohereApiKey,
  mistralai: config.mistralaiApiKey,
  huggingface: config.huggingfaceApiKey,
  ai21: config.ai21ApiKey,
  perplexity: config.perplexityApiKey,
  cloudflareai: [config.cloudflareaiApiKey, config.cloudflareaiAccountId],
  fireworksai: config.fireworksaiApiKey,
  watsonxai: [config.watsonxaiApiKey, config.watsonxaiSpaceId],
  friendliai: config.friendliaiApiKey,
  // nvidia: config.nvidiaApiKey,
  deepinfra: config.deepinfraApiKey,
};

const { getConfig } = require('../../src/utils/configManager.js');
config = getConfig();

let response;

for (let [module, apiKey] of Object.entries(modules)) {
  if (apiKey) {
    let secondaryKey = false;
    if (Array.isArray(apiKey)) {
      [apiKey, secondaryKey] = apiKey;
    }

    describe(`LLMInterfaceSendMessage("${module}")`, () => {
      test(`API Key should be set (string)`, () => {
        expect(typeof apiKey).toBe('string');
      });

      if (secondaryKey) {
        test(`Secondary Key (${module === 'cloudflareai' ? 'Account ID' : 'Space ID'}) should be set (string)`, () => {
          expect(typeof secondaryKey).toBe('string');
        });
      }

      test(`LLMInterfaceSendMessage should send a message and receive a response`, async () => {
        try {
          response = await LLMInterfaceSendMessage(
            module,
            !secondaryKey ? apiKey : [apiKey, secondaryKey],
            simplePrompt,
            options,
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
