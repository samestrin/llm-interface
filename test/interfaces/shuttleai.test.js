/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const ShuttleAI = require('../../src/interfaces/shuttleai.js');
const { shuttleaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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
  ShuttleAI,
  shuttleaiApiKey,
  'ShuttleAI',
  'shuttle-2-turbo',
  message,
  false,
);
