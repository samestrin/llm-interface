# llm-interface

## Table of Contents

- [Initializing llm-interface](#initializing-llm-interface)
- [Basic Usage Examples](#basic-usage-examples)
  - [OpenAI Interface](#openai-interface)
  - [AI21 Interface](#ai21-interface)
  - [Anthropic Interface](#anthropic-interface)
  - [Cohere Interface](#cohere-interface)
  - [Gemini Interface](#gemini-interface)
  - [Goose AI Interface](#goose-ai-interface)
  - [Groq Interface](#groq-interface)
  - [HuggingFace Interface](#huggingface-interface)
  - [Mistral AI Interface](#mistral-ai-interface)
  - [Perplexity Interface](#perplexity-interface)
  - [Reka AI Interface](#reka-ai-interface)
  - [LLaMA.cpp Interface](#llamacpp-interface)
- [Simple Usage Example](#simple-usage-example)
  - [OpenAI Interface (String Based Prompt)](#openai-interface-string-based-prompt)
- [Advanced Usage Examples](#advanced-usage-examples)
  - [OpenAI Interface (JSON Output)](#openai-interface-json-output)
  - [OpenAI Interface (Cached)](#openai-interface-cached)
  - [OpenAI Interface (Graceful Retry)](#openai-interface-graceful-retry)

# Usage

How to use `llm-interface` in your project.

## Initializing llm-interface

First, require the LLMInterface from the `llm-interface` package:

```javascript
const LLMInterface = require("llm-interface");
```

or import it:

```javascript
import LLMInterface from "llm-interface";
```

## Basic Usage Examples

Then select the interface you'd like to use and initialize it with an API key or LLama.cpp URL.

### OpenAI Interface

The OpenAI interface allows you to send messages to the OpenAI API.

#### Example

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

### AI21 Interface

The AI21 interface allows you to send messages to the AI21 API.

#### Example

````javascript
const ai21 = new LLMInterface.ai21(process.env.AI21_API_KEY);

const message = {
  model: "jamba-instruct",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

### Anthropic Interface

The Anthropic interface allows you to send messages to the Anthropic API.

#### Example

```javascript
const anthropic = new LLMInterface.anthropic(process.env.ANTHROPIC_API_KEY);

const message = {
  model: "claude-3-opus-20240229",
  messages: [
    {
      role: "user",
      content:
        "You are a helpful assistant. Say OK if you understand and stop.",
    },
    { role: "system", content: "OK" },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

anthropic
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
````

ai21
.sendMessage(message, { max_tokens: 150 })
.then((response) => {
console.log(response);
})
.catch((error) => {
console.error(error);
});

````

### Cohere Interface

The Cohere interface allows you to send messages to the Cohere API.

#### Example

```javascript
const cohere = new LLMInterface.cohere(process.env.GROQ_API_KEY);

const message = {
  model: "gpt-neo-20b",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

cohere
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
````

### Gemini Interface

The Gemini interface allows you to send messages to the Google Gemini API.

#### Example

```javascript
const gemini = new LLMInterface.gemini(process.env.GEMINI_API_KEY);

const message = {
  model: "gemini-1.5-flash",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

gemini
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Goose AI Interface

The Goose AI interface allows you to send messages to the Goose AI API.

#### Example

```javascript
const goose = new LLMInterface.goose(process.env.GROQ_API_KEY);

const message = {
  model: "gpt-neo-20b",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

goose
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
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
  model: "llama3-8b-8192",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

groq
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### HuggingFace Interface

The HuggingFace interface allows you to send messages to the HuggingFace API.

#### Example

```javascript
const huggingface = new LLMInterface.huggingface(process.env.ANTHROPIC_API_KEY);

const message = {
  model: "claude-3-opus-20240229",
  messages: [
    {
      role: "user",
      content:
        "You are a helpful assistant. Say OK if you understand and stop.",
    },
    { role: "system", content: "OK" },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

huggingface
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Mistral AI Interface

The Mistral AI interface allows you to send messages to the Mistral AI API.

#### Example

```javascript
const mistral = new LLMInterface.mistral(process.env.GROQ_API_KEY);

const message = {
  model: "llama3-8b-8192",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

mistral
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Perplexity Interface

The Perplexity interface allows you to send messages to the Perplexity API.

#### Example

```javascript
const perplexity = new LLMInterface.perplexity(process.env.ANTHROPIC_API_KEY);

const message = {
  model: "claude-3-opus-20240229",
  messages: [
    {
      role: "user",
      content:
        "You are a helpful assistant. Say OK if you understand and stop.",
    },
    { role: "system", content: "OK" },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

perplexity
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Reka AI Interface

The Reka AI interface allows you to send messages to the Reka AI REST API.

#### Example

```javascript
const reka = new LLMInterface.reka(process.env.REKA_API_KEY);

const message = {
  model: "reka-core",
  messages: [
    {
      role: "user",
      content:
        "You are a helpful assistant. Say OK if you understand and stop.",
    },
    { role: "system", content: "OK" },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

reka
  .sendMessage(message, {})
  .then((response) => console.log("Response:", response))
  .catch((error) => console.error("Error:", error));
```

### LLaMA.cpp Interface

The LLaMA.cpp interface allows you to send messages to the LLaMA.cpp API; this is exposed by the [LLaMA.cpp HTTP Server](https://github.com/ggerganov/llama.cpp/tree/master/examples/server).

#### Example

```javascript
const llamacpp = new LLMInterface.llamacpp(process.env.LLAMACPP_URL);

const message = {
  model: "some-llamacpp-model",
  messages: [
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

llamacpp
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Simple Usage Example

The following example demonstrates simplified use of `llm-interface`.

### OpenAI Interface (String Based Prompt)

This simplified example uses a string based prompt with the default OpenAI model (gpt-3.5-turbo).

#### Example

```javascript
const openai = new LLMInterface.openai(process.env.OPENAI_API_KEY);

const message = "Explain the importance of low latency LLMs.";

openai
  .sendMessage(message)
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Advanced Usage Examples

The following examples highlight some of the advanced features of `llm-interface`.

### OpenAI Interface (JSON Output)

Some interfaces allows you request the response back in JSON, currently **OpenAI** and **Gemini** are supported. To take advantage of this feature be sure to include text like "Return the results as a JSON object." and provide a desired output format like "Follow this format: [{reason, reasonDescription}]." In this example we use OpenAI and request a valid JSON object.

#### Example

```javascript
const openai = new LLMInterface.openai(process.env.OPENAI_API_KEY);

const message = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant.",
    },
    {
      role: "user",
      content:
        "Explain the importance of low latency LLMs. Return the results as a JSON object. Follow this format: [{reason, reasonDescription}].",
    },
  ],
};

openai
  .sendMessage(message, { max_tokens: 150, response_format: "json_object" })
  .then((response) => {
    console.log(response);
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
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

openai
  .sendMessage(message, { max_tokens: 150 }, { cacheTimeoutSeconds: 86400 })
  .then((response) => {
    console.log(response);
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
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

openai
  .sendMessage(message, { max_tokens: 150 }, { retryAttempts: 3 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```
