# llm-interface

## API Reference

### The Message Object

The message object is a critical component when interacting with the various LLM APIs through the `llm-interface` package. It contains the data that will be sent to the LLM for processing. Below is a detailed explanation of a valid message object.

#### Structure of a Message Object

A valid message object typically includes the following properties:

- `model`: A string specifying the model to use for the request (optional).
- `messages`: An array of message objects that form the conversation history.

Different LLMs may have their own message object rules. For example, both Anthropic and Gemini always expect the initial message to have the `user` role. Please be aware of this and structure your message objects accordingly. However, `llm-interface` will attempt to auto-correct invalid objects where possible.

### OpenAI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
openai
  .sendMessage(message, { max_tokens: 150, response_format: "json_object" })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### AI21

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
ai21
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Anthropic

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
anthropic
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Cohere

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
cohere
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Gemini

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
gemini
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Goose AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`, and `model`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
goose
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Groq

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
groq
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Hugging Face

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
huggingface
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Mistral AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
mistral
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Perplexity Labs

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
perplexity
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Reka AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `model`. This method currently has no token limitation.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
reka
  .sendMessage(message, {})
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```

### LLaMA.cpp

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`.
  - `cacheTimeoutSeconds`: An optional number specifying the cache timeout in seconds. If set, caching is enabled.
- **Returns:** A promise that resolves to the response text.
- **Example:**

```javascript
llamacpp
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
```
