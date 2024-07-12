/**
 * @file test/interfaces/anyscale.test.js
 * @description Tests for the Anyscale interface class.
 */

const Anyscale = require('../../src/interfaces/anyscale.js');
const { anyscaleApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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
  Anyscale,
  anyscaleApiKey,
  'Anyscale',
  'mistralai/Mistral-7B-Instruct-v0.1',
  message,
  false,
);
