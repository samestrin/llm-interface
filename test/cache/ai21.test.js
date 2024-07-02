/**
 * @file test/cache/ai21.test.js
 * @description Tests for the caching mechanism in the AI21 class.
 */

const AI21 = require('../../src/interfaces/ai21.js');
const { ai21ApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests(AI21, ai21ApiKey, 'AI21 Studio', 'jamba-instruct');
