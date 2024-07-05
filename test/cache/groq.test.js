/**
 * @file test/cache/groq.test.js
 * @description Tests for the caching mechanism in the Groq class.
 */

const { groqApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests('groq', groqApiKey);
