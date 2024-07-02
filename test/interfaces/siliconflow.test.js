/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const SiliconFlow = require('../../src/interfaces/siliconflow.js');
const { siliconflowApiKey } = require('../../src/config/config.js');
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
  SiliconFlow,
  siliconflowApiKey,
  'SiliconFlow',
  'Qwen/Qwen2-1.5B-Instruct',
  message,
);
