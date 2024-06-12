# llm-interface

## Usage Examples

First, require the handlers from the `llm-interface` package:

```javascript
const handlers = require("llm-interface");
```

### OpenAI Interface

The OpenAI interface allows you to send messages to the OpenAI API.

#### Example

```javascript
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

### Anthropic Interface

The Anthropic interface allows you to send messages to the Anthropic API.

#### Example

```javascript
const AnthropicWrapper = new handlers.anthropic(process.env.ANTHROPIC_API_KEY);

const message = {
  model: "claude-3-opus-20240229",
  messages: [
    { role: "user", content: "Explain the importance of low latency LLMs." },
  ],
};

AnthropicWrapper.sendMessage(message, { max_tokens: 150 })
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
const gemini = new handlers.gemini(process.env.GEMINI_API_KEY);

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

### Groq Interface

The Groq interface allows you to send messages to the Groq API.

#### Example

```javascript
const groq = new handlers.groq(process.env.GROQ_API_KEY);

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

### LlamaCPP Interface

The LlamaCPP interface allows you to send messages to the LlamaCPP API.

#### Example

```javascript
const llamacpp = new handlers.llamacpp(process.env.LLAMACPP_URL);

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
