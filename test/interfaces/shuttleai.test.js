/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const ShuttleAI = require('../../src/interfaces/shuttleai.js');
const { shuttleaiApiKey } = require('../../src/config/config.js');
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
  'wizardlm-2-70b',
  message,
  false,
);
