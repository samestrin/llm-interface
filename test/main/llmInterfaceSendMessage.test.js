/**
 * @file test/basic/llmInterfaceSendMessage.test.js
 * @description Tests for the LLMInterfaceSendMessage function.
 */

const { LLMInterfaceSendMessage } = require('../../src/index.js');
const config = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');

let modules = {
  openai: config.openaiApiKey,
  anthropic: config.anthropicApiKey,
  gemini: config.geminiApiKey,
  llamacpp: config.llamaURL,
  reka: config.rekaApiKey,
  groq: config.groqApiKey,
  goose: config.gooseApiKey,
  cohere: config.cohereApiKey,
  mistral: config.mistralApiKey,
  huggingface: config.huggingfaceApiKey,
  ai21: config.ai21ApiKey,
  perplexity: config.perplexityApiKey,
};

for (const [module, apiKey] of Object.entries(modules)) {
  if (apiKey) {
    describe(`LLMInterfaceSendMessage("${module}")`, () => {
      test(`API Key should be set`, () => {
        expect(typeof apiKey).toBe('string');
      });

      test(`API Client should send a message and receive a response`, async () => {
        const response = await LLMInterfaceSendMessage(
          module,
          apiKey,
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
