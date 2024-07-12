/**
 * @file mistralai.test.js
 * @description Simplified tests for the MistralAI API client.
 */

const MistralAI = require('../../src/interfaces/mistralai.js');
const { mistralaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(MistralAI, mistralaiApiKey, 'MistralAI', simplePrompt);
