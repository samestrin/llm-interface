# Usage

The following guide was created to help you use `llm-interface` in your project. It assumes you have already installed the `llm-interface` NPM package.

## Table of Contents

1. [Introduction](#introduction)
2. [Using the `LLMInterfaceSendMessage` Function](#using-the-llminterfacesendmessage-function)
   - [OpenAI: Simple Text Prompt, Default Model (Example 1)](#openai-simple-text-prompt-default-model-example-1)
   - [Gemini: Simple Text Prompt, Default Model, Cached (Example 2)](#gemini-simple-text-prompt-default-model-cached-example-2)
   - [Groq: Message Object Prompt, Default Model, Attempt JSON Repair (Example 3)](#groq-message-object-prompt-default-model-attempt-json-repair-example-3)
3. [The Message Object](#the-message-object)
   - [Structure of a Message Object](#structure-of-a-message-object)
4. [Using the Underlying Classes](#using-the-underlying-classes)
   - [OpenAI Interface Class](#openai-interface-class)
   - [AI21 Interface Class](#ai21-interface-class)
   - [Anthropic Interface Class](#anthropic-interface-class)
   - [Cloudflare AI Interface Class](#cloudflare-ai-interface-class)
   - [Cohere Interface Class](#cohere-interface-class)
   - [Fireworks AI Interface Class](#fireworks-ai-interface-class)
   - [Gemini Interface Class](#gemini-interface-class)
   - [Goose AI Interface Class](#goose-ai-interface-class)
   - [Groq Interface Class](#groq-interface-class)
   - [Hugging Face Interface Class](#hugging-face-interface-class)
   - [Mistral AI Interface Class](#mistral-ai-interface-class)
   - [Perplexity Interface Class](#perplexity-interface-class)
   - [Reka AI Interface Class](#reka-ai-interface-class)
   - [LLaMA.cpp Interface Class](#llamacpp-interface-class)
5. [Simple Usage Examples](#simple-usage-examples)
   - [OpenAI Interface (String Based Prompt)](#openai-interface-string-based-prompt)
   - [AI21 Interface (String Based Prompt)](#ai21-interface-string-based-prompt)
   - [Anthropic Interface (String Based Prompt)](#anthropic-interface-string-based-prompt)
   - [Cloudflare AI Interface (String Based Prompt)](#cloudflare-ai-interface-string-based-prompt)
   - [Cohere Interface (String Based Prompt)](#cohere-interface-string-based-prompt)
   - [Fireworks AI Interface (String Based Prompt)](#fireworks-ai-interface-string-based-prompt)
   - [Gemini Interface (String Based Prompt)](#gemini-interface-string-based-prompt)
   - [Goose AI Interface (String Based Prompt)](#goose-ai-interface-string-based-prompt)
   - [Groq Interface (String Based Prompt)](#groq-interface-string-based-prompt)
   - [Hugging Face Interface (String Based Prompt)](#hugging-face-interface-string-based-prompt)
   - [Mistral AI Interface (String Based Prompt)](#mistral-ai-interface-string-based-prompt)
   - [Perplexity Interface (String Based Prompt)](#perplexity-interface-string-based-prompt)
   - [Reka AI Interface (String Based Prompt)](#reka-ai-interface-string-based-prompt)
   - [LLaMA.cpp Interface (String Based Prompt)](#llamacpp-interface-string-based-prompt)
6. [Advanced Usage Examples](#advanced-usage-examples)
   - [OpenAI Interface (Native JSON Output)](#openai-interface-native-json-output)
   - [OpenAI Interface (Native JSON Output with Repair)](#openai-interface-native-json-output-with-repair)
   - [Groq Interface (JSON Output with Repair)](#groq-interface-json-output-with-repair)
   - [OpenAI Interface (Cached)](#openai-interface-cached)
   - [OpenAI Interface (Graceful Retry)](#openai-interface-graceful-retry)

## Using the `LLMInterfaceSendMessage` function

The `LLMInterfaceSendMessage` function gives you a single interface to all of the LLM providers available. To start, include the LLMInterface from the `llm-interface` package. You can do this using either the CommonJS `require` syntax:

```javascript
const { LLMInterfaceSendMessage } = require('llm-interface');
```

or the ES6 `import` syntax:

```javascript
import { LLMInterfaceSendMessage } from 'llm-interface';
```

Then call call the `LLMInterfaceSendMessage` function. Here are a few examples:

### OpenAI: Simple Text Prompt, Default Model (Example 1)

Ask OpenAi for a response using a message string with the default model, and default response token limit (150).

```javascript
LLMInterfaceSendMessage(
  'openai',
  openAiApikey,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Gemini: Simple Text Prompt, Default Model, Cached (Example 2)

Ask gemini for a response using a message string with the default model and limit the response to 250 tokens; cache the results for a day (86400 seconds).

```javascript
LLMInterfaceSendMessage(
  'gemini',
  geminiApikey,
  'Explain the importance of low latency LLMs.',
  { max_tokens: 250 },
  { cacheTimeoutSeconds: 86400 },
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Groq: Message Object Prompt, Default Model, Attempt JSON Repair (Example 3)

Ask groq for a JSON response using a message object with the largest model limit the response to 1024 tokens; repair the results if needed.

```javascript
const message = {
  model: 'large',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    {
      role: 'user',
      content:
        'Explain the importance of low latency LLMs. Return the results as a JSON object. Follow this format: [{reason, reasonDescription}]. Only return the JSON element, nothing else.',
    },
  ],
};

LLMInterfaceSendMessage(
  'groq',
  process.env.GROQ_API_KEY,
  message,
  { max_tokens: 1024 },
  { attemptJsonRepair: true },
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

## The Message Object

The message object is a critical component when interacting with the various LLM APIs through the `llm-interface` package. It contains the data that will be sent to the LLM for processing. Below is a detailed explanation of a valid message object.

### Structure of a Message Object

A valid message object typically includes the following properties:

- `model`: A string specifying the model to use for the request (optional).
- `messages`: An array of message objects that form the conversation history.

Different LLMs may have their own message object rules. For example, both Anthropic and Gemini always expect the initial message to have the `user` role. Please be aware of this and structure your message objects accordingly. _`llm-interface` will attempt to auto-correct invalid objects where possible._

## Using the underlying classes

The `LLMInterfaceSendMessage` function is a wrapper for a set of underlying interface classes. The following are examples of direct class interactions using a message object.

### OpenAI Interface

The OpenAI interface allows you to send messages to the OpenAI API.

#### Example

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
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### AI21 Interface

The AI21 interface allows you to send messages to the AI21 API.

#### Example

```javascript
const ai21 = new LLMInterface.ai21(process.env.AI21_API_KEY);

const message = {
  model: 'jamba-instruct',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

ai21
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Anthropic Interface

The Anthropic interface allows you to send messages to the Anthropic API.

#### Example

```javascript
const anthropic = new LLMInterface.anthropic(process.env.ANTHROPIC_API_KEY);

const message = {
  model: 'claude-3-opus-20240229',
  messages: [
    {
      role: 'user',
      content:
        'You are a helpful assistant. Say OK if you understand and stop.',
    },
    { role: 'system', content: 'OK' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

anthropic
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Cloudflare AI Interface

The CloudflareAI interface allows you to send messages to the Cloudflare AI API.

#### Example

```javascript
const cloudflareai = new LLMInterface.cloudflareai(
  process.env.CLOUDFLARE_API_KEY,
  process.env.CLOUDFLARE_ACCOUNT_ID,
);

const message = {
  model: '@cf/meta/llama-3-8b-instruct',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

cloudflareai
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Cohere Interface

The Cohere interface allows you to send messages to the Cohere API.

#### Example

```javascript
const cohere = new LLMInterface.cohere(process.env.COHERE_API_KEY);

const message = {
  model: 'gpt-neo-20b',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

cohere
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Fireworks AI Interface

The Fireworks AI interface allows you to send messages to the Fireworks AI API.

#### Example

```javascript
const fireworksai = new LLMInterface.fireworksai(
  process.env.FIREWORKSAI_API_KEY,
);

const message = {
  model: 'accounts/fireworks/models/phi-3-mini-128k-instruct',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

fireworksai
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Gemini Interface

The Gemini interface allows you to send messages to the Google Gemini API.

#### Example

```javascript
const gemini = new LLMInterface.gemini(process.env.GEMINI_API_KEY);

const message = {
  model: 'gemini-1.5-flash',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

gemini
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Goose AI Interface

The Goose AI interface allows you to send messages to the Goose AI API.

#### Example

```javascript
const gooseai = new LLMInterface.gooseai(process.env.GOOSEAI_API_KEY);

const message = {
  model: 'gpt-neo-20b',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

gooseai
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Groq Interface

The Groq interface allows you to send messages to the Groq API.

#### Example

```javascript
const groq = new LLMInterface.groq(process.env.GROQ_API_KEY);

const message = {
  model: 'llama3-8b-8192',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

groq
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### HuggingFace Interface

The HuggingFace interface allows you to send messages to the HuggingFace API.

#### Example

```javascript
const huggingface = new LLMInterface.huggingface(
  process.env.HUGGINGFACE_API_KEY,
);

const message = {
  model: 'claude-3-opus-20240229',
  messages: [
    {
      role: 'user',
      content:
        'You are a helpful assistant. Say OK if you understand and stop.',
    },
    { role: 'system', content: 'OK' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

huggingface
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Mistral AI Interface

The Mistral AI interface allows you to send messages to the Mistral AI API.

#### Example

```javascript
const mistralai = new LLMInterface.mistralai(process.env.MISTRALAI_API_KEY);

const message = {
  model: 'llama3-8b-8192',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

mistralai
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Perplexity Interface

The Perplexity interface allows you to send messages to the Perplexity API.

#### Example

```javascript
const perplexity = new LLMInterface.perplexity(process.env.PERPLEXITY_API_KEY);

const message = {
  model: 'claude-3-opus-20240229',
  messages: [
    {
      role: 'user',
      content:
        'You are a helpful assistant. Say OK if you understand and stop.',
    },
    { role: 'system', content: 'OK' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

perplexity
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Reka AI Interface

The Reka AI interface allows you to send messages to the Reka AI REST API.

#### Example

```javascript
const rekaai = new LLMInterface.rekaai(process.env.REKAAI_API_KEY);

const message = {
  model: 'reka-core',
  messages: [
    {
      role: 'user',
      content:
        'You are a helpful assistant. Say OK if you understand and stop.',
    },
    { role: 'system', content: 'OK' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

rekaai
  .sendMessage(message, {})
  .then((response) => console.log('Response:', response))
  .catch((error) => console.error('Error:', error));
```

### LLaMA.cpp Interface

The LLaMA.cpp interface allows you to send messages to the LLaMA.cpp API; this is exposed by the [LLaMA.cpp HTTP Server](https://github.com/ggerganov/llama.cpp/tree/master/examples/server).

#### Example

```javascript
const llamacpp = new LLMInterface.llamacpp(process.env.LLAMACPP_URL);

const message = {
  model: 'some-llamacpp-model',
  messages: [
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

llamacpp
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Simple Usage Examples

The following example demonstrates simplified use of `llm-interface`.

### OpenAI Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'openai',
  openAiApikey,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const openai = new LLMInterface.openai(process.env.OPENAI_API_KEY);

openai
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### AI21 Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'ai21',
  process.env.AI21_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const ai21 = new LLMInterface.ai21(process.env.AI21_API_KEY);

ai21
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Anthropic Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'anthropic',
  process.env.ANTHROPIC_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const anthropic = new LLMInterface.anthropic(process.env.ANTHROPIC_API_KEY);

anthropic
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Cloudflare AI Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'cloudflareai',
  [process.env.CLOUDFLARE_API_KEY, process.env.CLOUDFLARE_ACCOUNT_ID],
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const cloudflareai = new LLMInterface.cloudflareai(
  process.env.CLOUDFLARE_API_KEY,
);

cloudflareai
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Cohere Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'cohere',
  process.env.COHERE_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const cohere = new LLMInterface.cohere(process.env.COHERE_API_KEY);

cohere
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Fireworks AI Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'fireworksai',
  process.env.FIREWORKSAI_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const fireworksai = new LLMInterface.fireworksai(
  process.env.FIREWORKSAI_API_KEY,
);

fireworksai
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Gemini Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'gemini',
  process.env.GEMINI_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const gemini = new LLMInterface.gemini(process.env.GEMINI_API_KEY);

gemini
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Goose AI Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'goose',
  process.env.GOOSEAI_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const goose = new LLMInterface.gooseai(process.env.GOOSEAI_API_KEY);

goose
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Groq Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'groq',
  process.env.GROQ_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const groq = new LLMInterface.groq(process.env.GROQ_API_KEY);

groq
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### HuggingFace Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'huggingface',
  process.env.HUGGINGFACE_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const huggingface = new LLMInterface.huggingface(
  process.env.HUGGINGFACE_API_KEY,
);

huggingface
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Mistral AI Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'mistralai',
  process.env.MISTRALAI_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const mistralai = new LLMInterface.mistralai(process.env.MISTRALAI_API_KEY);

mistralai
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Perplexity Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'perplexity',
  process.env.PERPLEXITY_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const perplexity = new LLMInterface.perplexity(process.env.PERPLEXITY_API_KEY);

perplexity
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Reka AI Interface (String Based Prompt)

This simplified example uses a string based prompt with the default model.

#### Example

```javascript
LLMInterfaceSendMessage(
  'reka',
  process.env.REKAAI_API_KEY,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const reka = new LLMInterface.rekaai(process.env.REKAAI_API_KEY);

reka
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### LLaMA.cpp Interface (String Based Prompt)

This simplified example uses a string based prompt. The model is set at the LLaMA.cpp web server level.

#### Example

```javascript
LLMInterfaceSendMessage(
  'llamacpp',
  process.env.LLAMACPP_URL,
  'Explain the importance of low latency LLMs.',
)
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

or

```javascript
const llamacpp = new LLMInterface.llamacpp(process.env.LLAMACPP_URL);

llamacpp
  .sendMessage('Explain the importance of low latency LLMs.')
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Advanced Usage Examples

The following examples highlight some of the advanced features of `llm-interface`. Keep in mind you can mix and match _interfaceOptions_. The following are currently supported: `attemptJsonRepair` (default: false), `cacheTimeoutSeconds` (default: 0), `retryAttempts` (default: 1), and `retryMultiplier` (default: 0.3),

To maximize performance `llm-interface` will only load dependencies when invoked through interfaceOptions.

### OpenAI Interface (Native JSON Output)

Some interfaces allows you request the response back in JSON, currently **OpenAI**, **FireworksAI**, and **Gemini** are supported. To take advantage of this feature be sure to include text like "Return the results as a JSON object." and provide a desired output format like "Follow this format: [{reason, reasonDescription}]." \_It's important to provide a large enough max_token size to hold the entire JSON structure returned or it will not validate, and the response will return null.) In this example we use OpenAI and request a valid JSON object.

#### Example

```javascript
const openai = new LLMInterface.openai(process.env.OPENAI_API_KEY);

const message = {
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant.',
    },
    {
      role: 'user',
      content:
        'Explain the importance of low latency LLMs. Limit the result to two items. Return the results as a JSON object. Follow this format: [{reason, reasonDescription}].',
    },
  ],
};

openai
  .sendMessage(message, { max_tokens: 150, response_format: 'json_object' })
  .then((response) => {
    console.log(JSON.stringify(response.results));
  })
  .catch((error) => {
    console.error(error);
  });
```

### OpenAI Interface (Native JSON Output with Repair)

When working with JSON, you may encounter invalid JSON responses. Instead of retrying your prompt you can have `llm-interface` detect the condition and attempt to repair the object.

#### Example

```javascript
const openai = new LLMInterface.openai(process.env.OPENAI_API_KEY);

const message = {
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'system',
      content: 'You are a helpful assistant.',
    },
    {
      role: 'user',
      content:
        'Explain the importance of low latency LLMs. Limit the result to two items. Return the results as a JSON object. Follow this format: [{reason, reasonDescription}].',
    },
  ],
};

openai
  .sendMessage(
    message,
    { max_tokens: 150, response_format: 'json_object' },
    { attemptJsonRepair: true },
  )
  .then((response) => {
    console.log(JSON.stringify(response.results));
  })
  .catch((error) => {
    console.error(error);
  });
```

### Groq Interface (JSON Output with Repair)

When using LLMs without a native JSON response_format, you may encounter badly formed JSON response. Again, instead of retrying your prompt you can have `llm-interface` detect the condition and attempt to repair the object.

#### Example

```javascript
const groq = new LLMInterface.groq(process.env.GROQ_API_KEY);

const message = {
  model: 'llama3-8b-8192',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    {
      role: 'user',
      content:
        'Explain the importance of low latency LLMs. Return the results as a JSON object. Follow this format: [{reason, reasonDescription}]. Only return the JSON element, nothing else.',
    },
  ],
};

groq
  .sendMessage(message, { max_tokens: 150 }, { attemptJsonRepair: true })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### OpenAI Interface (Cached)

To reduce operational costs and improve performance you can optionally specify a cache timeout in seconds. In this example we use OpenAI and store the results for 86400 seconds or one day.

#### Example

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
  .sendMessage(message, { max_tokens: 150 }, { cacheTimeoutSeconds: 86400 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### OpenAI Interface (Graceful Retry)

You can gracefully retry your requests. In this example we use OpenAI and up to 3 times if needed.

#### Example

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
  .sendMessage(message, { max_tokens: 150 }, { retryAttempts: 3 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```
