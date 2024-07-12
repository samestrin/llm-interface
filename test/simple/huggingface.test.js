/**
 * @file test/simple/huggingface.test.js
 * @description Simplified tests for the Hugging Face Inference API client.
 */

const HuggingFace = require('../../src/interfaces/huggingface.js');
const { huggingfaceApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(HuggingFace, huggingfaceApiKey, 'HuggingFace', simplePrompt);
