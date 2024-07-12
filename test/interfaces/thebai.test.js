/**
 * @file test/interfaces/ai21.test.js
 * @description Tests for the TheBAI interface class.
 */

const TheBAI = require('../../src/interfaces/thebai.js');
const { thebaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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
  TheBAI,
  thebaiApiKey,
  'TheBAI',
  'llama-2-7b-chat',
  message,
  false,
  false,
);
