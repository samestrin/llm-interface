/**
 * @file test/interfaces/gemini.test.js
 * @description Tests for the Gemini API client.
 */

const Gemini = require('../../src/interfaces/gemini.js');
const { geminiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(Gemini, geminiApiKey, 'Gemini', 'gemini-1.5-flash', message, true);
