/**
 * @file test/cache/groq.test.js
 * @description Tests for the caching mechanism in the Groq class.
 */

const { groqApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const runTests = require('./sharedTestCases.js');
runTests('groq', groqApiKey);
