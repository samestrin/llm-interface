/**
 * @file test/interfaces/aimlapi.test.js
 * @description Tests for the AIMLAPI Studio API client.
 */

const AIMLAPI = require('../../src/interfaces/aimlapi.js');
const { aimlapiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(AIMLAPI, aimlapiApiKey, 'AIMLAPI', 'Qwen/Qwen1.5-0.5B-Chat', message);
