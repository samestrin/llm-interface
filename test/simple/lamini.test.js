/**
 * @file test/simple/lamini.test.js
 * @description Simplified tests for the Lamini AI API client.
 */

const Lamini = require('../../src/interfaces/lamini.js');
const { laminiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(Lamini, laminiApiKey, 'Lamini', simplePrompt, 10);
