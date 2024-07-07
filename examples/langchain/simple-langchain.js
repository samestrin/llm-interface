/**
 * @file examples/langchain/simple-langchain.js
 * @description Example showing various custom models compatible with langchain. To run this example, you will first need to run "npm install langchain dotenv".
 * This example uses a PromptTemplate to format the response.
 */

require('dotenv').config({ path: '../../.env' });

// Create a structure with the model names and their respective import paths
const models = [
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

  const template = 'What is the capital of {country}?';
  const promptTemplate = new PromptTemplate({
    template,
    inputVariables: ['country'],
  });

  const question = await promptTemplate.format({ country: 'France' });

  console.log('LangChain.js (Requires "npm install langchain dotenv"):');
  console.log();
  console.log('Prompt:');
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
