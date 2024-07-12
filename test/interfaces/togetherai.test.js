/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const TogetherAI = require('../../src/interfaces/togetherai.js');
const { togetheraiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

const message = {
  messages: [
    {
      role: 'user',
      content: simplePrompt,
    },
  ],
};

runTests(
  TogetherAI,
  togetheraiApiKey,
  'TogetherAI',
  'Qwen/Qwen1.5-0.5B-Chat',
  message,
);
