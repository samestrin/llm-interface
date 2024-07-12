/**
 * @file test/simple/cohere.test.js
 * @description Simplified tests for the Cohere API client.
 */

const Cohere = require('../../src/interfaces/cohere.js');
const { cohereApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(Cohere, cohereApiKey, 'Cohere', simplePrompt);
