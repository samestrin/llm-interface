/**
 * @file test/simple/watsonxai.test.js
 * @description Simplified tests for the watsonx.ai API client.
 */

const WatsonxAI = require('../../src/interfaces/watsonxai.js');
const {
  watsonxaiApiKey,
  watsonxaiProjectId,
} = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(
  WatsonxAI,
  [watsonxaiApiKey, watsonxaiProjectId],
  'WatsonxAI',
  simplePrompt,
);
