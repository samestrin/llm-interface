# llm-interface

[![Star on GitHub](https://img.shields.io/github/stars/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/stargazers) [![Fork on GitHub](https://img.shields.io/github/forks/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/network/members) [![Watch on GitHub](https://img.shields.io/github/watchers/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/watchers)

![Version 2.0.1494](https://img.shields.io/badge/Version-2.0.1494-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Built with Node.js](https://img.shields.io/badge/Built%20with-Node.js-green)](https://nodejs.org/)

## Introduction

LLM Interface is an npm module that streamlines your interactions with various Large Language Model (LLM) providers in your Node.js applications. It offers a unified interface, simplifying the process of switching between providers and their models.

The LLM Interface package offers comprehensive support for a wide range of language model providers, encompassing 36 different providers and hundreds of models. This extensive coverage ensures that you have the flexibility to choose the best models suited to your specific needs.

## Extensive Support for 36 Providers and Hundreds of Models

LLM Interface supports: **AI21 Studio, AiLAYER, AIMLAPI, Anyscale, Anthropic, Cloudflare AI, Cohere, Corcel, DeepInfra, DeepSeek, Fireworks AI, Forefront AI, FriendliAI, Google Gemini, GooseAI, Groq, Hugging Face Inference, HyperBee AI, Lamini, LLaMA.CPP, Mistral AI, Monster API, Neets.ai, Novita AI, NVIDIA AI, OctoAI, Ollama, OpenAI, Perplexity AI, Reka AI, Replicate, Shuttle AI, TheB.ai, Together AI, Voyage AI, Watsonx AI, Writer, and Zhipu AI**.

<!-- Support List -->

[![AI21 Studio](https://samestrin.github.io/media/llm-interface/icons/ai21.png)](/docs/providers/ai21.md) [![AIMLAPI](https://samestrin.github.io/media/llm-interface/icons/aimlapi.png)](/docs/providers/aimlapi.md) [![Anthropic](https://samestrin.github.io/media/llm-interface/icons/anthropic.png)](/docs/providers/anthropic.md) [![Anyscale](https://samestrin.github.io/media/llm-interface/icons/anyscale.png)](/docs/providers/anyscale.md) [![Cloudflare AI](https://samestrin.github.io/media/llm-interface/icons/cloudflareai.png)](/docs/providers/cloudflareai.md) [![Cohere](https://samestrin.github.io/media/llm-interface/icons/cohere.png)](/docs/providers/cohere.md) [![Corcel](https://samestrin.github.io/media/llm-interface/icons/corcel.png)](/docs/providers/corcel.md) [![DeepInfra](https://samestrin.github.io/media/llm-interface/icons/deepinfra.png)](/docs/providers/deepinfra.md) [![DeepSeek](https://samestrin.github.io/media/llm-interface/icons/deepseek.png)](/docs/providers/deepseek.md) [![Forefront AI](https://samestrin.github.io/media/llm-interface/icons/forefront.png)](/docs/providers/forefront.md) [![GooseAI](https://samestrin.github.io/media/llm-interface/icons/gooseai.png)](/docs/providers/gooseai.md) [![Lamini](https://samestrin.github.io/media/llm-interface/icons/lamini.png)](/docs/providers/lamini.md) [![Mistral AI](https://samestrin.github.io/media/llm-interface/icons/mistralai.png)](/docs/providers/mistralai.md) [![Monster API](https://samestrin.github.io/media/llm-interface/icons/monsterapi.png)](/docs/providers/monsterapi.md) [![Neets.ai](https://samestrin.github.io/media/llm-interface/icons/neetsai.png)](/docs/providers/neetsai.md) [![Perplexity AI](https://samestrin.github.io/media/llm-interface/icons/perplexity.png)](/docs/providers/perplexity.md) [![Reka AI](https://samestrin.github.io/media/llm-interface/icons/rekaai.png)](/docs/providers/rekaai.md) [![Replicate](https://samestrin.github.io/media/llm-interface/icons/replicate.png)](/docs/providers/replicate.md) [![Shuttle AI](https://samestrin.github.io/media/llm-interface/icons/shuttleai.png)](/docs/providers/shuttleai.md) [![Together AI](https://samestrin.github.io/media/llm-interface/icons/togetherai.png)](/docs/providers/togetherai.md) [![Writer](https://samestrin.github.io/media/llm-interface/icons/writer.png)](/docs/providers/writer.md)

<!-- Support List End -->

[Detailed Provider List](docs/providers/README.md)

## Features

- **Unified Interface**: `LLMInterface.sendMessage` is a single, consistent interface to interact with **36 different LLM APIs** (34 hosted LLM providers and 2 local LLM providers).
- **Chat Completion, Streaming and Embeddings**: Supports [chat completion, streaming, and embeddings](docs/providers/README.md) (with failover).
- **Dynamic Module Loading**: Automatically loads and manages LLM interfaces only when they are invoked, minimizing resource usage.
- **Error Handling**: Robust error handling mechanisms to ensure reliable API interactions.
- **Extensible**: Easily extendable to support additional LLM providers as needed.
- **Response Caching**: Efficiently caches LLM responses to reduce costs and enhance performance.
- **Graceful Retries**: Automatically retry failed prompts with increasing delays to ensure successful responses.
- **JSON Output**: Simple to use native JSON output for various LLM providers including OpenAI, Fireworks AI, Google Gemini, and more.
- **JSON Repair**: Detect and repair invalid JSON responses.

## Updates

**v2.0.14**

- **Recovery Mode (Beta)**: Automatically repair invalid JSON objects in HTTP 400 response errors. Currently, this feature is only available with Groq.

**v2.0.11**

- **New LLM Providers**: Anyscale, Bigmodel, Corcel, Deepseek, Hyperbee AI, Lamini, Neets AI, Novita AI, NVIDIA, Shuttle AI, TheB.AI, and Together AI.
- **Caching**: Supports multiple caches: `simple-cache`, `flat-cache`, and `cache-manager`. _`flat-cache` is now an optional package._
- **Logging**: Improved logging with the `loglevel`.
- **Improved Documentation**: Improved [documentation](docs/README.md) with new examples, glossary, and provider details. Updated API key details, model alias breakdown, and usage information.
- **More Examples**: [LangChain.js RAG](examples/langchain/rag.js), [Mixture-of-Agents (MoA)](examples/moa/moa.js), and [more](docs/examples.md).
- **Removed Dependency**: `@anthropic-ai/sdk` is no longer required.

## Dependencies

The project relies on several npm packages and APIs. Here are the primary dependencies:

- `axios`: For making HTTP requests (used for various HTTP AI APIs).
- `@google/generative-ai`: SDK for interacting with the Google Gemini API.
- `dotenv`: For managing environment variables. Used by test cases.
- `jsonrepair`: Used to repair invalid JSON responses.
- `loglevel`: A minimal, lightweight logging library with level-based logging and filtering.

The following optional packages can added to extend LLMInterface's caching capabilities:

- `flat-cache`: A simple JSON based cache.
- `cache-manager`: An extendible cache module that supports various backends including Redis, MongoDB, File System, Memcached, Sqlite, and more.

## Installation

To install the LLM Interface npm module, you can use npm:

```bash
npm install llm-interface
```

## Quick Start

- Looking for [API Keys](/docs/api-keys.md)? This document provides helpful links.
- Detailed [usage](/docs/usage.md) documentation is available here.
- Various [examples](/examples) are also available to help you get started.
- A breakdown of [model aliases](/docs/models.md) is available here.
- A breakdown of [embeddings model aliases](/docs/embeddings.md) is available here.
- If you still want more examples, you may wish to review the [test cases](/test/) for further examples.

## Usage

First import `LLMInterface`. You can do this using either the CommonJS `require` syntax:

```javascript
const { LLMInterface } = require('llm-interface');
```

or the ES6 `import` syntax:

```javascript
import { LLMInterface } from 'llm-interface';
```

then send your prompt to the LLM provider:

```javascript
LLMInterface.setApiKey({ openai: process.env.OPENAI_API_KEY });

try {
  const response = await LLMInterface.sendMessage(
    'openai',
    'Explain the importance of low latency LLMs.',
  );
} catch (error) {
  console.error(error);
}
```

if you prefer, you can pass use a one-liner to pass the provider and API key, essentially skipping the LLMInterface.setApiKey() step.

```javascript
const response = await LLMInterface.sendMessage(
  ['openai', process.env.OPENAI_API_KEY],
  'Explain the importance of low latency LLMs.',
);
```

Passing a more complex message object is just as simple. The same rules apply:

```javascript
const message = {
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

try {
  const response = await LLMInterface.sendMessage('openai', message, {
    max_tokens: 150,
  });
} catch (error) {
  console.error(error);
}
```

_LLMInterfaceSendMessage and LLMInterfaceStreamMessage are still available and will be available until version 3_

## Running Tests

The project includes tests for each LLM handler. To run the tests, use the following command:

```bash
npm test
```

#### Current Test Results

```bash
Test Suites: 9 skipped, 93 passed, 93 of 102 total
Tests:       86 skipped, 784 passed, 870 total
Snapshots:   0 total
Time:        630.029 s
```

_Note: Currently skipping NVIDIA test cases due to API issues, and Ollama due to performance issues._

## TODO

- [ ] Provider > Models > Azure AI
- [ ] Provider > Models > Grok
- [ ] Provider > Models > SiliconFlow
- [ ] Provider > Embeddings > Nomic
- [ ] _Feature > Image Generation?_

_Submit your suggestions!_

## Contribute

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

## Blogs

- [Comparing 13 LLM Providers API Performance with Node.js: Latency and Response Times Across Models](https://dev.to/samestrin/comparing-13-llm-providers-api-performance-with-nodejs-latency-and-response-times-across-models-2ka4)

## Share

[![Twitter](https://img.shields.io/badge/X-Tweet-blue)](https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20project!&url=https://github.com/samestrin/llm-interface) [![Facebook](https://img.shields.io/badge/Facebook-Share-blue)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/samestrin/llm-interface) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Share-blue)](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/samestrin/llm-interface)
