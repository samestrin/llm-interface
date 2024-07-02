/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const NeetsAI = require('../../src/interfaces/neetsai.js');
const { neetsaiApiKey } = require('../../src/config/config.js');
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

runTests(NeetsAI, neetsaiApiKey, 'NeetsAI', 'Neets-7B', message);
