/**
 * @file src/utils/loadApiKeysFromEnv.js
 * @description Configuration file to load environment variables.
 */

require('dotenv').config();

/**
 * Loads API keys and other environment variables from a .env file and exports them.
 * @module loadApiKeysFromEnv
 * @property {string} ai21ApiKey - The API key for AI21.
 * @property {string} aimlapiApiKey - The API key for AIMLAPI.
 * @property {string} anthropicApiKey - The API key for Anthropic.
 * @property {string} cloudflareaiAccountId - The Cloudflare AI account ID.
 * @property {string} cloudflareaiApiKey - The API key for Cloudflare AI.
 * @property {string} cohereApiKey - The API key for Cohere.
 * @property {string} deepinfraApiKey - The API key for DeepInfra.
 * @property {string} deepseekApiKey - The API key for DeepSeek.
 * @property {string} fireworksaiApiKey - The API key for FireworksAI.
 * @property {string} forefrontApiKey - The API key for Forefront.
 * @property {string} friendliaiApiKey - The API key for FriendliAI.
 * @property {string} geminiApiKey - The API key for Gemini.
 * @property {string} gooseaiApiKey - The API key for GooseAI.
 * @property {string} groqApiKey - The API key for Groq.
 * @property {string} huggingfaceApiKey - The API key for Hugging Face.
 * @property {string} llamaURL - The URL for LLaMACPP.
 * @property {string} mistralaiApiKey - The API key for MistralAI.
 * @property {string} monsterapiApiKey - The API key for MonsterAPI.
 * @property {string} nvidiaApiKey - The API key for NVIDIA.
 * @property {string} octoaiApiKey - The API key for OctoAI.
 * @property {string} ollamaURL - The URL for Ollama.
 * @property {string} openaiApiKey - The API key for OpenAI.
 * @property {string} perplexityApiKey - The API key for Perplexity.
 * @property {string} rekaaiApiKey - The API key for RekaAI.
 * @property {string} replicateApiKey - The API key for Replicate.
 * @property {string} togetheraiApiKey - The API key for TogetherAI.
 * @property {string} watsonxaiApiKey - The API key for WatsonX.ai.
 * @property {string} watsonxaiSpaceId - The space ID for WatsonX.ai.
 * @property {string} writerApiKey - The API key for Writer.
 * @property {string} neetsaiApiKey - The API key for NeetsAI.
 * @property {string} ailayerApiKey - The API key for AILayer.
 * @property {string} corcelApiKey - The API key for Corcel.
 * @property {string} shuttleaiApiKey - The API key for ShuttleAI.
 * @property {string} siliconflowApiKey - The API key for SiliconFlow.
 * @property {string} anyscaleApiKey - The API key for Anyscale.
 * @property {string} laminiApiKey - The API key for Lamini.
 * @property {string} thebaiApiKey - The API key for TheBAI.
 * @property {string} hyperbeeaiApiKey - The API key for HyperBeeAI.
 * @property {string} novitaaiApiKey - The API key for NovitaAI.
 * @property {string} zhipuaiApiKey - The API key for ZhipuAI.
 * @property {string} voyageApiKey - The API key for Voyage.
 */
module.exports = {
  ai21ApiKey: process.env.AI21_API_KEY,
  aimlapiApiKey: process.env.AIMLAPI_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  cloudflareaiAccountId: process.env.CLOUDFLARE_ACCOUNT_ID,
  cloudflareaiApiKey: process.env.CLOUDFLARE_API_KEY,
  cohereApiKey: process.env.COHERE_API_KEY,
  deepinfraApiKey: process.env.DEEPINFRA_API_KEY,
  deepseekApiKey: process.env.DEEPSEEK_API_KEY,
  fireworksaiApiKey: process.env.FIREWORKSAI_API_KEY,
  forefrontApiKey: process.env.FOREFRONT_API_KEY,
  friendliaiApiKey: process.env.FRIENDLIAI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  gooseaiApiKey: process.env.GOOSEAI_API_KEY,
  groqApiKey: process.env.GROQ_API_KEY,
  huggingfaceApiKey: process.env.HUGGINGFACE_API_KEY,
  llamaURL: process.env.LLAMACPP_URL,
  mistralaiApiKey: process.env.MISTRALAI_API_KEY,
  monsterapiApiKey: process.env.MONSTERAPI_API_KEY,
  nvidiaApiKey: process.env.NVIDIA_API_KEY,
  octoaiApiKey: process.env.OCTOAI_API_KEY,
  ollamaURL: process.env.OLLAMA_URL,
  openaiApiKey: process.env.OPENAI_API_KEY,
  perplexityApiKey: process.env.PERPLEXITY_API_KEY,
  rekaaiApiKey: process.env.REKAAI_API_KEY,
  replicateApiKey: process.env.REPLICATE_API_KEY,
  togetheraiApiKey: process.env.TOGETHERAI_API_KEY,
  watsonxaiApiKey: process.env.WATSONXSAI_API_KEY,
  watsonxaiSpaceId: process.env.WATSONXSAI_SPACE_ID,
  writerApiKey: process.env.WRITER_API_KEY,
  neetsaiApiKey: process.env.NEETSAI_API_KEY,
  ailayerApiKey: process.env.AILAYER_API_KEY,
  corcelApiKey: process.env.CORCEL_API_KEY,
  shuttleaiApiKey: process.env.SHUTTLEAI_API_KEY,
  siliconflowApiKey: process.env.SILICONFLOW_API_KEY,
  anyscaleApiKey: process.env.ANYSCALE_API_KEY,
  laminiApiKey: process.env.LAMINI_API_KEY,
  thebaiApiKey: process.env.THEBAI_API_KEY,
  hyperbeeaiApiKey: process.env.HYPERBEEAI_API_KEY,
  novitaaiApiKey: process.env.NOVITAAI_API_KEY,
  zhipuaiApiKey: process.env.ZHIPUAIL_API_KEY,
  voyageApiKey: process.env.VOYAGE_API_KEY,
};
