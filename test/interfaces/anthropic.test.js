/**
 * @file test/interfaces/anthropic.test.js
 * @description Tests for the Anthropic API client.
 */

const Anthropic = require('../../src/interfaces/anthropic.js');
const { anthropicApiKey } = require('../../src/config/config.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

const message = {
  messages: [
    {
      role: 'user',
      content:
        'You are a helpful assistant. Say OK if you understand and stop.',
    },
    {
      role: 'system',
      content: 'OK',
    },
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
  'claude-3-opus-20240229',
  message,
  false,
);
