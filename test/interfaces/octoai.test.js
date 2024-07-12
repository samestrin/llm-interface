/**
 * @file test/interfaces/octoai.test.js
 * @description Tests for the OctoAI Studio API client.
 */

const OctoAI = require('../../src/interfaces/octoai.js');
const { octoaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(OctoAI, octoaiApiKey, 'OctoAI', 'mistral-7b-instruct', message);
