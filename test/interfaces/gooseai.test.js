/**
 * @file test/interfaces/goose.test.js
 * @description Tests for the Goose AI API client.
 */

const GooseAI = require('../../src/interfaces/gooseai.js');
const { gooseaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(GooseAI, gooseaiApiKey, 'GooseAI', 'gpt-j-6b', message, false);
