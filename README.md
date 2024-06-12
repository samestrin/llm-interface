# llm-interface

[![Star on GitHub](https://img.shields.io/github/stars/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/stargazers) [![Fork on GitHub](https://img.shields.io/github/forks/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/network/members) [![Watch on GitHub](https://img.shields.io/github/watchers/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/watchers)

![Version 0.0.1](https://img.shields.io/badge/Version-0.0.1-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Built with Node.js](https://img.shields.io/badge/Built%20with-Node.js-green)](https://nodejs.org/)

## Introduction

The LLM Interface project is a versatile and comprehensive wrapper designed to interact with multiple Large Language Model (LLM) APIs. It simplifies integrating various LLM providers, including OpenAI, Anthropic, Google Gemini, Groq, and LlamaCP, into your applications. This project aims to provide a simplified and unified interface for sending messages and receiving responses from different LLM services, making it easier for developers to work with multiple LLMs without worrying about the specific intricacies of each API.

## Features

- **Unified Interface**: A single, consistent interface to interact with multiple LLM APIs.
- **Dynamic Module Loading**: Automatically loads and manages different LLM handlers.
- **Error Handling**: Robust error handling mechanisms to ensure reliable API interactions.
- **Extensible**: Easily extendable to support additional LLM providers as needed.

## Dependencies

The project relies on several npm packages and APIs. Here are the primary dependencies:

- `dotenv`: For managing environment variables.
- `axios`: For making HTTP requests (used in LlamaCP).
- `@anthropic-ai/sdk`: SDK for interacting with the Anthropic API.
- `@google/generative-ai`: SDK for interacting with the Google Gemini API.
- `groq-sdk`: SDK for interacting with the Groq API.
- `openai`: SDK for interacting with the OpenAI API.

## Installation

To install the `llm-interface` package, you can use npm:

```bash
npm install llm-interface
```

## Usage

### Example

```javascript
const handlers = require("llm-interface");

const openai = new handlers.openai(process.env.OPENAI_API_KEY);
const message = {
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};
openai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Running Tests

The project includes tests for each LLM handler. To run the tests, use the following command:

`npm test`

## Contribute

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes or improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Share

[![Twitter](https://img.shields.io/badge/X-Tweet-blue)](https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20project!&url=https://github.com/samestrin/llm-interface) [![Facebook](https://img.shields.io/badge/Facebook-Share-blue)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/samestrin/llm-interface) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Share-blue)](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/samestrin/llm-interface)
