/**
 * @file reka.test.js
 * @description Simplified test for the Reka AI API client.
 */

const RekaAI = require('../../src/interfaces/rekaai.js');
const { rekaaiApiKey } = require('../../src/config/config.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(RekaAI, rekaaiApiKey, 'RekaAI', simplePrompt);
