/**
 * @file test/simple/groq.test.js
 * @description Simplified tests for the Groq API client.
 */

const Groq = require('../../src/interfaces/groq.js');
const { groqApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(Groq, groqApiKey, 'Groq', simplePrompt);
