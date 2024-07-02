/**
 * @file test/cache/groq.test.js
 * @description Tests for the caching mechanism in the Groq class.
 */

const Groq = require('../../src/interfaces/groq');
const { groqApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests(Groq, groqApiKey, 'Groq', 'llama3-8b-8192');
