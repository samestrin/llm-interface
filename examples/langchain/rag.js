/**
 * @file examples/langchain/rag.js
 * @description This example demonstrates Retrieval-Augmented Generation (RAG) with custom models built using LLMInterface, which are compatible with LangChain.js.
 *
 * To run this example, you need to install the required modules by executing:
 * "npm install langchain dotenv".
 *
 * This example showcases how to retrieve relevant documents from a local directory, generate embeddings using a custom model built with LLMInterface, identify the most relevant context for answering a question, and construct a prompt for a language model to generate a response.
 *
 * The workflow employs cosine similarity to determine document relevance and utilizes LangChain.js to format and process the final prompt. After completing the RAG process, a final direct query is sent to the provider, and the control answer is displayed for comparison.
 */

const fs = require('fs');
const path = require('path');
const {
  prettyHeader,
  prettyResult,
  prettyText,
  GREEN,
  RESET,
} = require('../../src/utils/utils.js');
const { findTopKSimilarDocuments } = require('./utils/similarity');

// custom models using LLMInterface
const HuggingFaceModel = require('./models/huggingfaceModel');
const AI21Model = require('./models/ai21Model');

// Example description
const description = `This example demonstrates the use of Retrieval-Augmented Generation (RAG) with custom models built using LLMInterface, which are compatible with LangChain.js. The process involves retrieving relevant documents from a local directory, generating embeddings, identifying the most pertinent context for answering a question, and constructing a prompt for a language model to generate a response.

The workflow employs cosine similarity to determine the relevance of documents and utilizes LangChain.js to format and process the final prompt. After completing the RAG process, a final direct query is sent to the provider, and the control answer is displayed for comparison.`;

require('dotenv').config({ path: '../../.env' });

const providers = {
  'Hugging Face': {
    apiKey: process.env.HUGGINGFACE_API_KEY,
    model: HuggingFaceModel,
    interfaceName: 'huggingface',
  },
  'AI21 Studio': {
    apiKey: process.env.AI21_API_KEY,
    model: AI21Model,
    interfaceName: 'ai21',
  },
};

/**
 * Main exampleUsage() function.
 */
async function exampleUsage(provider) {
  prettyHeader(
    `Retrieval-Augmented Generation (RAG) using '${provider}'`,
    description,
    false,
    providers[provider].interfaceName,
  );

  const { PromptTemplate } = await import('@langchain/core/prompts');
  const { LLMChain } = await import('langchain/chains');

  console.time('Timer');

  prettyText(`\n\n${YELLOW}Loading Data Files (./data)${RESET}\n\n`);
  console.log(
    'Both relevant and irrelevant content was included to demonstrate how RAG effectively filters and utilizes the most pertinent information to generate accurate and contextually appropriate responses.',
  );
  // Directory containing the data files
  const dataDir = './data';
  // Read the directory and get an array of filenames
  const dataFiles = fs
    .readdirSync(dataDir)
    .filter((file) => path.extname(file) === '.md');

  console.log();
  console.table(dataFiles);

  const data = dataFiles.map((filename) => {
    const filePath = path.join(dataDir, filename);
    const pageContent = fs.readFileSync(filePath, 'utf-8');
    return {
      pageContent: pageContent,
      metadata: { source: filename },
    };
  });
  console.timeEnd('Timer');

  console.time('Timer');
  prettyText(
    `\n${YELLOW}Get Embeddings using custom ${provider} model and calculating cosine similarity${RESET}\n\n`,
  );
  let modelInstance = null;

  modelInstance = new providers[provider].model(
    providers[provider].apiKey,
    86400,
  );

  const vectors = await modelInstance.embed(data.map((doc) => doc.pageContent));
  const vectorStore = { vectors, data };

  const question = 'Who was the first person on the Moon?';

  const queryEmbedding = await modelInstance.embedQuery(question);
  const topKDocuments = findTopKSimilarDocuments(
    queryEmbedding,
    vectorStore.vectors,
    vectorStore.data,
  );
  console.timeEnd('Timer');

  console.time('Timer');
  prettyText(
    `\n${YELLOW}Use Langchain.js to create the PromptTemplate and invoke LLMChain${RESET}\n`,
  );

  const promptTemplate = new PromptTemplate({
    template:
      "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {query}\nHelpful Answer:",
    inputVariables: ['context', 'query'],
  });

  const llmChain = new LLMChain({
    llm: modelInstance,
    prompt: promptTemplate,
  });

  const combinedContext = topKDocuments
    .map((doc) => doc.pageContent)
    .join('\n\n');

  const finalprompt = {
    context: combinedContext,
    query: question,
  };
  console.log();
  console.timeEnd('Timer');

  console.time('Timer');
  prettyText(`${GREEN}Question:${RESET}`);
  console.log(`\n\n> ${question}`);

  const answer = await llmChain.invoke(finalprompt);

  prettyText(`\n${GREEN}Answer (RAG):${RESET}`);
  console.log(`\n\n> ${answer.text}\n`);

  console.timeEnd('Timer');

  console.time('Timer');
  const controlAnswer = await modelInstance.call(question);

  prettyText(`\n${GREEN}Answer (Control):${RESET}`);
  console.log(`\n\n> ${controlAnswer}\n`);

  console.log();
  console.timeEnd('Timer');
  console.log();
}

const readline = require('readline');

// Create an interface for reading input from the process.stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define the set of choices
const choices = ['AI21 Studio', 'Hugging Face'];

// Function to display choices and prompt for input
function promptUser(callback) {
  prettyHeader(
    `Retrieval-Augmented Generation (RAG) Example (Requires "npm install langchain dotenv")`,
    description,
  );
  console.log('\n');
  choices.forEach((choice, index) => {
    console.log(`${index + 1}: ${choice}`);
  });

  rl.question('Enter the number of your choice: ', (answer) => {
    const choiceIndex = parseInt(answer, 10) - 1;

    if (choiceIndex >= 0 && choiceIndex < choices.length) {
      rl.close();
      callback(null, choices[choiceIndex]);
    } else {
      console.log('Invalid choice. Please try again.');
      promptUser(callback);
    }
  });
}

// Using the promptUser function with a callback
promptUser((err, selectedChoice) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log();
    exampleUsage(selectedChoice);
  }
});
