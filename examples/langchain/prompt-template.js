/**
 * @file examples/langchain/prompt-template.js
 * @description This example demonstrates the use of various custom models compatible with LangChain. Prompts are
 * created using the "PromptTemplate" class from the @langchain/core package.
 *
 * To run this example, you need to install the required modules by executing:
 * "npm install langchain dotenv".
 *
 * This example uses a promptTemplate to format the response.
 */

const { prettyHeader, prettyResult } = require('../../src/utils/utils.js');
require('dotenv').config({ path: '../../.env' });

// Create a structure with the model names and their respective import paths
const models = [
  {
    name: 'AI21Model',
    interfaceName: 'ai21',
    importPath: './models/ai21Model',
  },
  {
    name: 'AIMLAPIModel',
    interfaceName: 'aimlapi',
    importPath: './models/aimlApiModel',
  },
  {
    name: 'HuggingFaceModel',
    interfaceName: 'huggingface',
    importPath: './models/huggingfaceModel',
  },
  {
    name: 'MonsterAPIModel',
    interfaceName: 'monsterapi',
    importPath: './models/monsterApiModel',
  },
  {
    name: 'NovitaAIModel',
    interfaceName: 'novitaai',
    importPath: './models/novitaAiModel',
  },
  {
    name: 'ShuttleAIModel',
    interfaceName: 'shuttleai',
    importPath: './models/shuttleAiModel',
  },
];

// Example description
const description = `This example demonstrates the use of various custom models compatible with LangChain. To run this example, you need to install the required modules by executing: "npm install langchain dotenv". This example uses a promptTemplate to format the response.`;

// Create an array with the names as keys and the API keys as values using dotenv
const apiKeys = Object.fromEntries(
  models.map((model) => [
    model.name,
    process.env[`${model.interfaceName.toUpperCase()}_API_KEY`],
  ]),
);

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  const { PromptTemplate } = await import('@langchain/core/prompts');

  prettyHeader('LangChain.js PromptTemplate', description);
  const template = 'What is the capital of {country}?';
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ['country'],
  });

  const question = await promptTemplate.format({ country: 'France' });

  console.log('LangChain.js PromptTemplate:');
  console.log();
  console.log('prompt:');
  console.log(`> ${question.replaceAll('\n', '\n> ')}`);
  console.log();

  for (const model of models) {
    const ModelClass = require(model.importPath);
    const modelInstance = new ModelClass(apiKeys[model.name]);

    try {
      const response = await modelInstance.call(question);
      console.log(`${model.name} response:`, response);
    } catch (error) {
      console.error(`${model.name} encountered an error:`, error);
    }
  }
  console.log();
}

exampleUsage();
