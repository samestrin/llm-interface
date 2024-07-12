/**
 * @file test/simple/hyperbeeai.test.js
 * @description Simplified tests for the HyperbeeAI AI API client.
 */

const HyperbeeAI = require('../../src/interfaces/hyperbeeai.js');
const { hyperbeeaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(HyperbeeAI, hyperbeeaiApiKey, 'HyperbeeAI', simplePrompt);
