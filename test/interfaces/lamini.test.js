/**
 * @file test/interfaces/lamini.test.js
 * @description Tests for the Lamini interface class.
 */

const Lamini = require('../../src/interfaces/lamini.js');
const { laminiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(Lamini, laminiApiKey, 'Lamini', 'microsoft/phi-2', message, false);
