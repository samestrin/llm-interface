/**
 * @file test/simple/aimlapi.test.js
 * @description Simplified tests for the AIMLAPI AI API client.
 */

const AIMLAPI = require('../../src/interfaces/aimlapi.js');
const { aimlapiApiKey } = require('../../src/config/config.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(AIMLAPI, aimlapiApiKey, 'AIMLAPI', simplePrompt);
