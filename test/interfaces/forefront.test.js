/**
 * @file test/interfaces/forefront.test.js
 * @description Tests for the Forefront API client.
 */

const Forefront = require('../../src/interfaces/forefront.js');
const { forefrontApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(
  Forefront,
  forefrontApiKey,
  'Forefront',
  'forefront/Mistral-7B-Instruct-v0.2-chatml',
  message,
  false,
);
