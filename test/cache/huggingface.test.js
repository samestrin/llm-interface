/**
 * @file test/cache/huggingface.test.js
 * @description Tests for the caching mechanism in the Hugging Face class.
 */

const HuggingFace = require('../../src/interfaces/huggingface.js');
const { huggingfaceApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');

runTests(HuggingFace, huggingfaceApiKey, 'HuggingFace', 'gpt2');
