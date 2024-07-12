/**
 * @file test/simple/ai21.test.js
 * @description Simplified tests for the AI21 Studio AI API client.
 */

const AI21 = require('../../src/interfaces/ai21.js');
const { ai21ApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(AI21, ai21ApiKey, 'AI21', simplePrompt);
