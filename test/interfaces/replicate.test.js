/**
 * @file test/interfaces/replicate.test.js
 * @description Tests for the Replicate Studio API client.
 */

const Replicate = require('../../src/interfaces/replicate.js');
const { replicateApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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
  Replicate,
  replicateApiKey,
  'Replicate',
  'mistralai/mistral-7b-instruct-v0.2',
  message,
);
