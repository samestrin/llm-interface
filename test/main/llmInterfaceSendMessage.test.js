/**
 * @file test/basic/llmInterfaceSendMessage.test.js
 * @description Tests for the LLMInterfaceSendMessage function.
 */

const { LLMInterfaceSendMessage } = require('../../src/index.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

let config = require('../../src/config/config.js');

let modules = {
  ai21: config.ai21ApiKey,
  aimlapi: config.aimlapiApiKey,
  anthropic: config.anthropicApiKey,
  cloudflareai: [config.cloudflareaiApiKey, config.cloudflareaiAccountId],
  cohere: config.cohereApiKey,
  deepinfra: config.deepinfraApiKey,
  deepseek: config.deepseekApiKey,
  fireworksai: config.fireworksaiApiKey,
  forefront: config.forefrontApiKey,
  friendliai: config.friendliaiApiKey,
  gemini: config.geminiApiKey,
  gooseai: config.gooseaiApiKey,
  groq: config.groqApiKey,
  huggingface: config.huggingfaceApiKey,
  llamacpp: config.llamaURL,
  mistralai: config.mistralaiApiKey,
  monsterapi: config.monsterapiApiKey,
  nvidia: config.nvidiaApiKey,
  octoai: config.octoaiApiKey,
  ollama: config.ollamaURL,
  openai: config.openaiApiKey,
  perplexity: config.perplexityApiKey,
  rekaai: config.rekaaiApiKey,
  replicate: config.replicateApiKey,
  togetherai: config.togetheraiApiKey,
  watsonxai: [config.watsonxaiApiKey, config.watsonxaiSpaceId],
  writer: config.writerApiKey,
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
