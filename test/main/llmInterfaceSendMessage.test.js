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
};

const { getConfig } = require('../../src/utils/configManager.js');
config = getConfig();

let response;

for (let [module, apiKey] of Object.entries(modules)) {
  if (apiKey) {
    let accountId = false;
    if (Array.isArray(apiKey)) {
      [apiKey, accountId] = apiKey;
    }

    describe(`LLMInterfaceSendMessage("${module}")`, () => {
      test(`API Key should be set`, () => {
        expect(typeof apiKey).toBe('string');
      });

      if (accountId) {
        test(`Account ID should be set`, () => {
          expect(typeof accountId).toBe('string');
        });
      }

      test(`API Client should send a message and receive a response`, async () => {
        try {
          response = await LLMInterfaceSendMessage(
            module,
            !accountId ? apiKey : [apiKey, accountId],
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
