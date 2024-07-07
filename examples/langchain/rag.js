/**
 * @file examples/langchain/langchain.js
 * @description Example showing RAG using a custom HuggingFace model compatible with langchain. To run this example, you will first need to
 * run "npm install langchain  dotenv". This example uses a PromptTemplate to format the response.
 */

const fs = require('fs');
const path = require('path');

const { findTopKSimilarDocuments } = require('./utils/similarity');

const HuggingFaceModel = require('./models/huggingfaceModel');

require('dotenv').config({ path: '../../.env' });

const apiKey = process.env.HUGGINGFACE_API_KEY;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  console.log(
    'Retrieval-Augmented Generation (RAG) (Requires "npm install langchain dotenv"):',
  );
  console.log();
  console.log(
    'This example demonstrates the use of Retrieval-Augmented Generation (RAG) by leveraging a custom Hugging Face model, built with llm-interface, that is compatible with LangChain. The example showcases how to retrieve relevant documents from a local directory, embed them using a Hugging Face model, find the most relevant context for answering a question, and construct a prompt for a language model to generate a response. The workflow uses cosine similarity to determine document relevance and LangChain to format and process the final prompt.',
  );

  const { PromptTemplate } = await import('@langchain/core/prompts');
  const { LLMChain } = await import('langchain/chains');

  const dataFiles = ['moon-landing.md', 'space-stations.md', 'bicycles.md']; // Add more filenames as needed
  const dataDir = './data'; // Directory containing the data files

  console.log();
  console.log('Loading Data Files (./data):');
  console.log();
  console.log(
    'Both relevant and irrelevant content was included to demonstrate how RAG effectively filters and utilizes the most pertinent information to generate accurate and contextually appropriate responses.',
  );
  console.table(dataFiles);

  const data = dataFiles.map((filename) => {
    const filePath = path.join(dataDir, filename);
    const pageContent = fs.readFileSync(filePath, 'utf-8');
    return {
      pageContent: pageContent,
      metadata: { source: filename },
    };
  });

  const modelInstance = new HuggingFaceModel(apiKey, 86400);
  const vectors = await modelInstance.embed(data.map((doc) => doc.pageContent));
  const vectorStore = { vectors, data };

  const promptTemplate = new PromptTemplate({
    template:
      "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {query}\nHelpful Answer:",
    inputVariables: ['context', 'query'],
  });

  const llmChain = new LLMChain({
    llm: modelInstance,
    prompt: promptTemplate,
  });

  const question = 'Who was the first person on the Moon?';

  console.log();
  console.log('Question:', question);

  const queryEmbedding = await modelInstance.embedQuery(question);
  const topKDocuments = findTopKSimilarDocuments(
    queryEmbedding,
    vectorStore.vectors,
    vectorStore.data,
  );

  const combinedContext = topKDocuments
    .map((doc) => doc.pageContent)
    .join('\n\n');

  const finalPrompt = {
    context: combinedContext,
    query: question,
  };

  const answer = await llmChain.invoke(finalPrompt);
  console.log();
  console.log('Answer:', answer.text);
  console.log();
}

exampleUsage();
