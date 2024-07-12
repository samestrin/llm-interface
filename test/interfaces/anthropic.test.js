/**
 * @file test/interfaces/anthropic.test.js
 * @description Tests for the Anthropic API client.
 */

const Anthropic = require('../../src/interfaces/anthropic.js');
const { anthropicApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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
  Anthropic,
  anthropicApiKey,
  'Anthropic',
  'claude-3-sonnet-20240229',
  message,
);
