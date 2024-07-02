/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const HyperbeeAI = require('../../src/interfaces/hyperbeeai.js');
const { hyperbeeaiApiKey } = require('../../src/config/config.js');
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

runTests(HyperbeeAI, hyperbeeaiApiKey, 'HyperbeeAI', 'small-bee-en', message);
