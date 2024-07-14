![Shuttle AI](https://samestrin.github.io/media/llm-interface/shuttleai.app.1600x900.png)

# [Shuttle AI](https://shuttleai.app)

ShuttleAI provides a platform for developers to easily integrate AI capabilities into their applications. They offer a powerful API for tasks like text completion, image generation, and chat interactions, with a variety of models to choose from, including their own Shuttle models. ShuttleAI aims to make AI accessible and affordable for developers, providing an interactive chat interface and documentation to streamline the development process.

## Interface Name

- `shuttleai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'shuttleai': process.env.SHUTTLEAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('shuttleai', 'Explain the importance of low latency LLMs.');
    console.log(response.results);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

main();
```

### Model Aliases

The following model aliases are provided for this provider. 

- `default`: shuttle-2-turbo
- `large`: shuttle-2-turbo
- `small`: shuttle-2-turbo
- `agent`: shuttle-2-turbo


## Options

The following parameters can be passed through `options`.

- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `tool_choice`: Specifies which external tools the AI can use to assist in generating its response.
- `tools`: A list of external tools available for the AI to use in generating responses.


### Features

- Streaming
- Tools


## Getting an API Key

**Details Pending:** You can attempt to request an API key by visiting this URL.

To get an API key, first create a Shuttle AI account, then visit the link below.

- https://shuttleai.app/keys


## [Shuttle AI Documentation](https://docs.shuttleai.app/getting-started/introduction)

[Shuttle AI documentation](https://docs.shuttleai.app/getting-started/introduction) is available [here](https://docs.shuttleai.app/getting-started/introduction).
