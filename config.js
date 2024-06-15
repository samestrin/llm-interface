/**
 * @file config.js
 * @description Configuration file to load environment variables.
 */

require("dotenv").config();

module.exports = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  groqApiKey: process.env.GROQ_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  llamaURL: process.env.LLAMACPP_URL,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  rekaApiKey: process.env.REKA_API_KEY,
  gooseApiKey: process.env.GOOSE_API_KEY,
  cohereApiKey: process.env.COHERE_API_KEY,
  mistralApiKey: process.env.MISTRAL_API_KEY,
};
