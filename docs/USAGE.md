# llm-interface

## Usage Examples

First, require the LLMInterface from the `llm-interface` package:

```javascript
const LLMInterface = require("llm-interface");
```

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
```

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
```

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
