/**
 * @file test/interfaces/watsonxai.test.js
 * @description Tests for the WatsonxAI API client.
 */

const WatsonxAI = require('../../src/interfaces/watsonxai.js');
const {
  watsonxaiApiKey,
  watsonxaiProjectId,
} = require('../../src/utils/loadApiKeysFromEnv.js');
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
  WatsonxAI,
  [watsonxaiApiKey, watsonxaiProjectId],
  'WatsonxAI',
  'google/flan-t5-xxl',
  message,
  false,
);
