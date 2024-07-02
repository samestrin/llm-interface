/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const Corcel = require('../../src/interfaces/corcel.js');
const { corcelApiKey } = require('../../src/config/config.js');
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

runTests(Corcel, corcelApiKey, 'Corcel', 'llama-3', message, true, true, 60);
