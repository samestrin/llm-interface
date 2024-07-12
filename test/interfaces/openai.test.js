/**
 * @file test/interfaces/openai.test.js
 * @description Tests for the OpenAI API client.
 */

const OpenAI = require('../../src/interfaces/openai.js');
const { openaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(OpenAI, openaiApiKey, 'OpenAI', 'gpt-3.5-turbo', message);
