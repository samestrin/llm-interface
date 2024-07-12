/**
 * @file test/interfaces/mistralai.test.js
 * @description Tests for the MistralAI API client.
 */

const MistralAI = require('../../src/interfaces/mistralai.js');
const { mistralaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

const message = {
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    {
      role: 'user',
      content: simplePrompt,
    },
  ],
};

runTests(
  MistralAI,
  mistralaiApiKey,
  'MistralAI',
  'mistral-small-latest',
  message,
);
