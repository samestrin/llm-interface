/**
 * @file test/interfaces/huggingface.test.js
 * @description Tests for the Hugging Face Inference API client.
 */

const HuggingFace = require('../../src/interfaces/huggingface.js');
const { huggingfaceApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

const message = {
  messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant.',
    },
    {
      role: 'user',
      content: simplePrompt,
    },
  ],
};

runTests(
  HuggingFace,
  huggingfaceApiKey,
  'HuggingFace',
  'microsoft/Phi-3-mini-4k-instruct',
  message,
);
