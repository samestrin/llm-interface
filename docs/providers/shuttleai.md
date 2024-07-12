![Shuttle AI](https://samestrin.github.io/media/llm-interface/shuttleai.app.1600x900.png)

# Shuttle AI

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

The following values can be passed through `options`.

- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `tool_choice`: _Details not available, please refer to the LLM provider documentation._
- `tools`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming
- Tools


## Getting an API Key

**Details Pending:** You can attempt to request an API key by visiting this URL.

To get an API key, first create a Shuttle AI account, then visit the link below.

- https://shuttleai.app/keys


## [Shuttle AI Documentation](https://docs.shuttleai.app/getting-started/introduction)

[Shuttle AI documentation](https://docs.shuttleai.app/getting-started/introduction) is available [here](https://docs.shuttleai.app/getting-started/introduction).
