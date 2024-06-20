/**
 * @file test/basic/llmInterfaceSendMessage.test.js
 * @description Tests for the LLMInterfaceSendMessage function.
 */

const { LLMInterfaceSendMessage } = require('../../src/index.js');
const config = require('../../src/config/config.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');

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
        const response = await LLMInterfaceSendMessage(
          module,
          !accountId ? apiKey : [apiKey, accountId],
          simplePrompt,
          options,
        );

        expect(typeof response).toStrictEqual('object');
      }, 30000);
    });
  } else {
    test.skip(`${module} API Key is not set`, () => {});
  }
}
