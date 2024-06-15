# llm-interface

[![Star on GitHub](https://img.shields.io/github/stars/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/stargazers) [![Fork on GitHub](https://img.shields.io/github/forks/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/network/members) [![Watch on GitHub](https://img.shields.io/github/watchers/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/watchers)

![Version 0.0.7](https://img.shields.io/badge/Version-0.0.7-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Built with Node.js](https://img.shields.io/badge/Built%20with-Node.js-green)](https://nodejs.org/)

## Introduction

The LLM Interface project is a versatile and comprehensive wrapper designed to interact with multiple Large Language Model (LLM) APIs. It simplifies integrating various LLM providers, including **OpenAI, Anthropic, Cohere, Google Gemini, Goose AI, Groq, Mistral AI, Reka AI, and LLaMA.cpp**, into your applications. This project aims to provide a simplified and unified interface for sending messages and receiving responses from different LLM services, making it easier for developers to work with multiple LLMs without worrying about the specific intricacies of each API.

## Updates

**v0.0.8**

- **Mistral AI**: Added support for Mistral AI
- **Cohere**: Added support for Cohere

**v0.0.7**

- **Goose AI**: Added support for Goose AI

## Features

- **Unified Interface**: A single, consistent interface to interact with multiple LLM APIs.
- **Dynamic Module Loading**: Automatically loads and manages different LLM LLMInterface.
- **Error Handling**: Robust error handling mechanisms to ensure reliable API interactions.
- **Extensible**: Easily extendable to support additional LLM providers as needed.
- **JSON Output**: Simple to use JSON output for OpenAI and Gemini responses.

## Dependencies

The project relies on several npm packages and APIs. Here are the primary dependencies:

- `axios`: For making HTTP requests (used for Cohere, Goose AI, LLaMA.cpp and Reka).
- `@anthropic-ai/sdk`: SDK for interacting with the Anthropic API.
- `@google/generative-ai`: SDK for interacting with the Google Gemini API.
- `groq-sdk`: SDK for interacting with the Groq API.
- `openai`: SDK for interacting with the OpenAI API.
- `dotenv`: For managing environment variables. Used by test cases.

## Installation

To install the `llm-interface` package, you can use npm:

```bash
npm install llm-interface
```

## Usage

### Example

Import `llm-interface` using:

```javascript
const LLMInterface = require("llm-interface");
```

or

```javascript
import LLMInterface from "llm-interface";
```

then call the handler you want to use:

```javascript
const openai = new LLMInterface.openai(process.env.OPENAI_API_KEY);
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

Additional [usage examples](/docs/USAGE.md) and an [API reference](/docs/API.md) are available. You may also wish to review the [test cases](/test/) for further examples.

## Running Tests

The project includes tests for each LLM handler. To run the tests, use the following command:

```bash
npm test
```

## Contribute

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes or improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Share

[![Twitter](https://img.shields.io/badge/X-Tweet-blue)](https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20project!&url=https://github.com/samestrin/llm-interface) [![Facebook](https://img.shields.io/badge/Facebook-Share-blue)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/samestrin/llm-interface) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Share-blue)](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/samestrin/llm-interface)
