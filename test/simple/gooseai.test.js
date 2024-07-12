/**
 * @file test/simple/goose.test.js
 * @description Simplified tests for the Goose AI API client.
 */

const GooseAI = require('../../src/interfaces/gooseai.js');
const { gooseaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(GooseAI, gooseaiApiKey, 'GooseAI', simplePrompt);
