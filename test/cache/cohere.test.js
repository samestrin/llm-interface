/**
 * @file test/cache/cohere.test.js
 * @description Tests for the caching mechanism in the Cohere class.
 */

const { cohereApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests('cohere', cohereApiKey);
