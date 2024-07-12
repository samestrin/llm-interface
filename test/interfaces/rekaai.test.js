/**
 * @file test/interfaces/reka.test.js
 * @description Tests for the Reka AI API client.
 */

const RekaAI = require('../../src/interfaces/rekaai.js');
const { rekaaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(RekaAI, rekaaiApiKey, 'RekaAI', 'reka-edge', message, false);
