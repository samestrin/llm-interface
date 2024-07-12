/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const Neetsai = require('../../src/interfaces/neetsai.js');
const { neetsaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(Neetsai, neetsaiApiKey, 'Neetsai', 'Neets-7B', message);
