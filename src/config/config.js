/**
 * @file src/config/config.js
 * @description Configuration file to load environment variables.
 */

require('dotenv').config();

module.exports = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  groqApiKey: process.env.GROQ_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  llamaURL: process.env.LLAMACPP_URL,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  rekaaiApiKey: process.env.REKAAI_API_KEY,
  gooseaiApiKey: process.env.GOOSEAI_API_KEY,
  cohereApiKey: process.env.COHERE_API_KEY,
  mistralaiApiKey: process.env.MISTRALAI_API_KEY,
  huggingfaceApiKey: process.env.HUGGINGFACE_API_KEY,
  perplexityApiKey: process.env.PERPLEXITY_API_KEY,
  ai21ApiKey: process.env.AI21_API_KEY,
  cloudflareaiApiKey: process.env.CLOUDFLARE_API_KEY,
  cloudflareaiAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  fireworksaiApiKey: process.env.FIREWORKSAI_API_KEY,
};
