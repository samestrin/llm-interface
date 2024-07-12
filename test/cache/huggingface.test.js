/**
 * @file test/cache/huggingface.test.js
 * @description Tests for the caching mechanism in the Hugging Face class.
 */

const { huggingfaceApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const runTests = require('./sharedTestCases.js');
runTests('huggingface', huggingfaceApiKey);
