/**
 * @file test/interfaces/lamina.test.js
 * @description Tests for the Lamina interface class.
 */

const Lamina = require('../../src/interfaces/lamina.js');
const { laminaApiKey } = require('../../src/config/config.js');
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

runTests(Lamina, laminaApiKey, 'Lamina', 'microsoft/phi-2', message, false);
