# llm-interface

[![Star on GitHub](https://img.shields.io/github/stars/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/stargazers) [![Fork on GitHub](https://img.shields.io/github/forks/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/network/members) [![Watch on GitHub](https://img.shields.io/github/watchers/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/watchers)

![Version 1.0.1](https://img.shields.io/badge/Version-1.0.1-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Built with Node.js](https://img.shields.io/badge/Built%20with-Node.js-green)](https://nodejs.org/)

## Introduction

The LLM Interface project is a versatile and comprehensive wrapper designed to interact with multiple Large Language Model (LLM) APIs. It simplifies integrating various LLM providers, including **OpenAI, AI21 Studio, Anthropic, Cloudflare AI, Cohere, Fireworks AI, Google Gemini, Goose AI, Groq, Hugging Face, Mistral AI, Perplexity, Reka AI, and LLaMA.cpp**, into your applications. This project aims to provide a simplified and unified interface for sending messages and receiving responses from different LLM services, making it easier for developers to work with multiple LLMs without worrying about the specific intricacies of each API.

## Features

- **Unified Interface**: A single, consistent interface to interact with multiple LLM APIs.
- **Dynamic Module Loading**: Automatically loads and manages different LLM LLMInterface.
- **Error Handling**: Robust error handling mechanisms to ensure reliable API interactions.
- **Extensible**: Easily extendable to support additional LLM providers as needed.
- **JSON Output**: Simple to use JSON output for OpenAI and Gemini responses.
- **Response Caching**: Efficiently caches LLM responses to reduce costs and enhance performance.
- **Graceful Retries**: Automatically retry failed prompts with increasing delays to ensure successful responses.

## Updates

**v2.0.0**

- **New LLM Providers**: Added support for Cloudflare AI, and Fireworks AI
- **JSON Consistency**: A breaking change has been introduced: all responses now return as valid JSON objects.
- **JSON Repair**: Use `interfaceOptions.attemptJsonRepair` to repair invalid JSON responses when they occur.
- **Interface Name Changes**:`reka` becomes `rekaai`, `goose` becomes `gooseai`, `mistral` becomes `mistralai`.
- **Deprecated**: `handlers` has been removed.

**v1.0.01**

- **LLMInterfaceSendMessage**: Send a message to any LLM provider without creating a new instance of the `llm-interface`.
- **Model Aliases**: Simplified model selection, `default`, `small`, and `large` model aliases now available.
- **Major Refactor**: Improved comments, test cases, centralized LLM provider definitions.

## Dependencies

The project relies on several npm packages and APIs. Here are the primary dependencies:

- `axios`: For making HTTP requests (used for various HTTP AI APIs).
- `@anthropic-ai/sdk`: SDK for interacting with the Anthropic API.
- `@google/generative-ai`: SDK for interacting with the Google Gemini API.
- `groq-sdk`: SDK for interacting with the Groq API.
- `openai`: SDK for interacting with the OpenAI API.
- `dotenv`: For managing environment variables. Used by test cases.
- `flat-cache`: For caching API responses to improve performance and reduce redundant requests.
- `jsonrepair`: Used to repair invalid JSON responses.
- `jest`: For running test cases.

## Installation

To install the `llm-interface` package, you can use npm:

```bash
npm install llm-interface
```

## Usage

### Example

Import `llm-interface` using:

```javascript
const LLMInterface = require('llm-interface');
```

or

```javascript
import LLMInterface from 'llm-interface';
```

then call the handler you want to use:

```javascript
const openai = new LLMInterface.openai(process.env.OPENAI_API_KEY);

const message = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
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

or if you want to keep things _simple_ you can use:

```javascript
const openai = new LLMInterface.openai(process.env.OPENAI_API_KEY);

openai
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

If you need [API Keys](/docs/APIKEYS.md), use this [starting point](/docs/APIKEYS.md). Additional [usage examples](/docs/USAGE.md) and an [API reference](/docs/API.md) are available. You may also wish to review the [test cases](/test/) for further examples.

## Running Tests

The project includes tests for each LLM handler. To run the tests, use the following command:

```bash
npm test
```

## Contribute

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

## Share

[![Twitter](https://img.shields.io/badge/X-Tweet-blue)](https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20project!&url=https://github.com/samestrin/llm-interface) [![Facebook](https://img.shields.io/badge/Facebook-Share-blue)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/samestrin/llm-interface) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Share-blue)](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/samestrin/llm-interface)
