/**
 * @file test/simple/forefront.test.js
 * @description Simplified tests for the Forefront AI API client.
 */

const Forefront = require('../../src/interfaces/forefront.js');
const { forefrontApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(Forefront, forefrontApiKey, 'Forefront', simplePrompt);
