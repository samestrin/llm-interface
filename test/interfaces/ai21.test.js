/**
 * @file test/interfaces/ai21.test.js
 * @description Tests for the AI21 interface class.
 */

const AI21 = require('../../src/interfaces/ai21.js');
const { ai21ApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(AI21, ai21ApiKey, 'AI21', 'jamba-instruct', message);
