/**
 * @file test/cache/gemini.test.js
 * @description Tests for the caching mechanism in the Gemini class.
 */

const { geminiApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests('gemini', geminiApiKey);
