/**
 * @file test/cache/goose.test.js
 * @description Tests for the caching mechanism in the GooseAI class.
 */

const { gooseaiApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests('gooseai', gooseaiApiKey);
