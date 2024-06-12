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

#### `sendMessage(message, options)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
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

### Anthropic

#### `sendMessage(message, options)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
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

### Gemini

#### `sendMessage(message, options)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
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

### Groq

#### `sendMessage(message, options)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
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

### Reka AI

#### `sendMessage(message, options)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `model`. This method currently has no token limitation.
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

### LlamaCPP

#### `sendMessage(message, options)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`.
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
