/**
 * @file test/interfaces/zhipuai.test.js
 * @description Tests for the ZhipuAI API client.
 */

const ZhipuAI = require('../../src/interfaces/zhipuai.js');
const { zhipuaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

const message = {
  messages: [
    {
      role: 'user',
      content: simplePrompt,
    },
  ],
};

runTests(ZhipuAI, zhipuaiApiKey, 'ZhipuAI', 'glm-4', message);
