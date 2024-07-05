/**
 * @file test/cache/anthropic.test.js
 * @description Tests for the caching mechanism in the Anthropic class.
 */

const { anthropicApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests('anthropic', anthropicApiKey);
