const { Chain } = require('langchain');
const GroqModel = require('./groqModel');

const apiKey = process.env.GROQ_API_KEY;
const groqModel = new GroqModel(apiKey);

// Define a chain that uses the custom Groq model
const chain = new Chain([
  {
    call: async (input) => {
      const response = await groqModel.call(input, { max_tokens: 1024 });
      return response.results;
    },
  },
]);

async function handleQuery(query) {
  const response = await chain.call(query);
  console.log("Chatbot response:", response);
}

handleQuery("How can I integrate Groq with LangChain.js?");
