/**
 * @file examples/langchain/langchain.js
 * @description Example showing a custom HuggingFace model that is compatible with langchain. To run this example, you will first need to run "npm install langchain".
 * This example uses a PromptTemplate to format the response.
 */

require('dotenv').config({ path: '../../.env' });

const apiKey = process.env.HUGGINGFACE_API_KEY;

// custom model using llm-interface
const HuggingFaceModel = require('./models/huggingfaceModel');
const model = new HuggingFaceModel(apiKey);

async function exampleUsage() {
  const { PromptTemplate } = await import('@langchain/core/prompts');

  const template = 'What is the capital of {country}?';
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ['country'],
  });

  const question = await promptTemplate.format({ country: 'France' });
  const response = await model.call(question);
  console.log(response); // Output: Paris
}

exampleUsage();
