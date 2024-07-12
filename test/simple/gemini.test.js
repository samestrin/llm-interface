/**
 * @file test/simple/gemini.test.js
 * @description Simplified tests for the Gemini API client.
 */

const Gemini = require('../../src/interfaces/gemini.js');
const { geminiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(Gemini, geminiApiKey, 'Gemini', simplePrompt);
