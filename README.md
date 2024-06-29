# llm-interface

[![Star on GitHub](https://img.shields.io/github/stars/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/stargazers) [![Fork on GitHub](https://img.shields.io/github/forks/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/network/members) [![Watch on GitHub](https://img.shields.io/github/watchers/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/watchers)

![Version 2.0.9](https://img.shields.io/badge/Version-2.0.9-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Built with Node.js](https://img.shields.io/badge/Built%20with-Node.js-green)](https://nodejs.org/)

## Introduction

`llm-interface` is a wrapper designed to interact with multiple Large Language Model (LLM) APIs. `llm-interface` simplifies integrating various LLM providers, including **OpenAI, AI21 Studio, AIML API, Anthropic, Cloudflare AI, Cohere, DeepInfra, Fireworks AI, Forefront, Friendli AI, Google Gemini, Goose AI, Groq, Hugging Face, Mistral AI, Monster API, Octo AI, Ollama, Perplexity, Reka AI, Replicate, watsonx.ai, Writer, and LLaMA.cpp**, into your applications. It is available as an [NPM package](https://www.npmjs.com/package/llm-interface).

This goal of `llm-interface` is to provide a single, simple, unified interface for sending messages and receiving responses from different LLM services. This will make it easier for developers to work with multiple LLMs without worrying about the specific intricacies of each API.

## Features

- **Unified Interface**: `LLMInterfaceSendMessage` is a single, consistent interface to interact with **24 different LLM APIs** (22 hosted LLM providers and 2 local LLM providers).
- **Dynamic Module Loading**: Automatically loads and manages LLM interfaces only when they are invoked, minimizing resource usage.
- **Error Handling**: Robust error handling mechanisms to ensure reliable API interactions.
- **Extensible**: Easily extendable to support additional LLM providers as needed.
- **Response Caching**: Efficiently caches LLM responses to reduce costs and enhance performance.
- **Graceful Retries**: Automatically retry failed prompts with increasing delays to ensure successful responses.
- **JSON Output**: Simple to use native JSON output for various LLM providers  including OpenAI, Fireworks AI, Google Gemini, and more.
- **JSON Repair**: Detect and repair invalid JSON responses.

## Updates

**v2.0.9**

- **New LLM Providers**: Added support for AIML API (_currently not respecting option values_), DeepSeek, Forefront, Ollama, Replicate, and Writer.
- **New LLMInterface Methods**: `LLMInterface.setApiKey`, `LLMInterface.sendMesage`, and `LLMInterface.streamMessage`.
- **New Interface Function**: `LLMInterfaceStreamMessage`
- **Streaming**: Streaming support available for: AI21 Studio, AIML API, DeepInfra, DeepSeek, Fireworks AI, FriendliAI, Groq, Hugging Face, LLaMa.CPP, Mistral AI, Monster API, NVIDIA,
Octo AI, Ollama, OpenAI, Perplexity, Together AI, and Writer.
- **Test Coverage**: 100% test coverage for all interface classes.
- **Examples**: New usage [examples](/examples).

**v2.0.8**

- **Removing Dependencies**: The removal of OpenAI and Groq SDKs results in a smaller bundle, faster installs, and reduced complexity.

## Dependencies

The project relies on several npm packages and APIs. Here are the primary dependencies:

- `axios`: For making HTTP requests (used for various HTTP AI APIs).
- `@anthropic-ai/sdk`: SDK for interacting with the Anthropic API.
- `@google/generative-ai`: SDK for interacting with the Google Gemini API.
- `dotenv`: For managing environment variables. Used by test cases.
- `flat-cache`: For optionally caching API responses to improve performance and reduce redundant requests.
- `jsonrepair`: Used to repair invalid JSON responses.
- `jest`: For running test cases.

## Installation

To install the `llm-interface` package, you can use npm:

```bash
npm install llm-interface
```

## Usage

### Example

First import `LLMInterfaceSendMessage`. You can do this using either the CommonJS `require` syntax:

```javascript
const { LLMInterfaceSendMessage } = require('llm-interface');
```

or the ES6 `import` syntax:

```javascript
import { LLMInterfaceSendMessage } from 'llm-interface';
```

then send your prompt to the LLM provider of your choice:

```javascript
try {
  const response = LLMInterfaceSendMessage('openai', process.env.OPENAI_API_KEY, 'Explain the importance of low latency LLMs.');
} catch (error) {
  console.error(error);
}
```

or if you'd like to chat, use the message object. You can also pass through options such as `max_tokens`.

```javascript
const message = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

try {
  const response = LLMInterfaceSendMessage('openai', process.env.OPENAI_API_KEY, message, { max_tokens: 150 });
} catch (error) {
  console.error(error);
}
```

If you need [API Keys](/docs/APIKEYS.md), use this [starting point](/docs/APIKEYS.md). Additional [usage examples](/docs/USAGE.md) and an [API reference](/docs/API.md) are available. You may also wish to review the [test cases](/test/) for further examples.

## Running Tests

The project includes tests for each LLM handler. To run the tests, use the following command:

```bash
npm test
```

#### Current Test Results

```bash
Test Suites: 1 skipped, 65 passed, 65 of 66 total
Tests:       2 skipped, 291 passed, 293 total
Snapshots:   0 total
Time:        103.293 s, estimated 121 s
```

_Note: Currently skipping NVIDIA test cases due to API key limits._

## Contribute

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

## Blogs

- [Comparing 13 LLM Providers API Performance with Node.js: Latency and Response Times Across Models](https://dev.to/samestrin/comparing-13-llm-providers-api-performance-with-nodejs-latency-and-response-times-across-models-2ka4)

## Share

[![Twitter](https://img.shields.io/badge/X-Tweet-blue)](https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20project!&url=https://github.com/samestrin/llm-interface) [![Facebook](https://img.shields.io/badge/Facebook-Share-blue)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/samestrin/llm-interface) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Share-blue)](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/samestrin/llm-interface)
