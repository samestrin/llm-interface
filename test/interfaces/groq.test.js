/**
 * @file test/interfaces/groq.test.js
 * @description Tests for the Groq API client.
 */

const Groq = require('../../src/interfaces/groq.js');
const { groqApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(Groq, groqApiKey, 'Groq', 'llama3-8b-8192', message);
