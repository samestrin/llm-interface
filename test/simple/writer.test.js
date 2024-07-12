/**
 * @file test/simple/writer.test.js
 * @description Simplified tests for the Writer API client.
 */

const Writer = require('../../src/interfaces/writer.js');
const { writerApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(Writer, writerApiKey, 'Writer', simplePrompt);
