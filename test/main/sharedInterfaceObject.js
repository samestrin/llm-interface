/**
 * @file test/basic/llmInterfaceGetModelConfigValue.test.js
 * @description Tests for the LLMInterface.getModelConfigValue function.
 */

let config = require('../../src/config/config.js');

let interfaces = {
  ai21: config.ai21ApiKey,
  ailayer: config.ailayerApiKey,
  aimlapi: config.aimlapiApiKey,
  anyscale: config.anyscaleApiKey,
  anthropic: config.anthropicApiKey,
  bigmodel: config.bigmodelApiKey,
  cloudflareai: [config.cloudflareaiApiKey, config.cloudflareaiAccountId],
  cohere: config.cohereApiKey,
  corcel: config.corcelApiKey,
  deepinfra: config.deepinfraApiKey,
  deepseek: config.deepseekApiKey,
  fireworksai: config.fireworksaiApiKey,
  forefront: config.forefrontApiKey,
  friendliai: config.friendliaiApiKey,
  gemini: config.geminiApiKey,
  gooseai: config.gooseaiApiKey,
  groq: config.groqApiKey,
  huggingface: config.huggingfaceApiKey,
  hyperbeeai: config.hyperbeeaiApiKey,
  lamini: config.laminiApiKey,
  llamacpp: config.llamaURL,
  mistralai: config.mistralaiApiKey,
  monsterapi: config.monsterapiApiKey,
  neetsai: config.neetsaiApiKey,
  novitaai: config.novitaaiApiKey,
  nvidia: config.nvidiaApiKey,
  octoai: config.octoaiApiKey,
  ollama: config.ollamaURL,
  openai: config.openaiApiKey,
  perplexity: config.perplexityApiKey,
  rekaai: config.rekaaiApiKey,
  replicate: config.replicateApiKey,
  shuttleai: config.shuttleaiApiKey,
  siliconflow: config.siliconflowApiKey,
  thebai: config.thebaiApiKey,
  togetherai: config.togetheraiApiKey,
  watsonxai: [config.watsonxaiApiKey, config.watsonxaiSpaceId],
  writer: config.writerApiKey,
};

interfaces = {
  lamini: config.laminiApiKey,
};

module.exports = interfaces;
