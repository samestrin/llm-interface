/**
 * @file test/interfaces/deepseek.test.js
 * @description Tests for the DeepSeek API client.
 */

const DeepSeek = require('../../src/interfaces/deepseek.js');
const { deepseekApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(DeepSeek, deepseekApiKey, 'DeepSeek', 'deepseek-chat', message);
