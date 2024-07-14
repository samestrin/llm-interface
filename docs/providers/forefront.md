![Forefront AI](https://assets.forefront.ai/og_image.png)

# [Forefront AI](https://forefront.ai)

Forefront AI offers a chat-based AI model named 'forefront/Mistral-7B-Instruct-v0.2-chatml' for various text generation tasks.

## Interface Name

- `forefront`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'forefront': process.env.FOREFRONT_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('forefront', 'Explain the importance of low latency LLMs.');
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

- `default`: forefront/Mistral-7B-Instruct-v0.2-chatml
- `large`: forefront/Mistral-7B-Instruct-v0.2-chatml
- `small`: forefront/Mistral-7B-Instruct-v0.2-chatml


## Options

The following parameters can be passed through `options`.

- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.


## Getting an API Key

**Commercial with Free Trial**: The Forefront API is a commercial product but offers $20 in free credits to get started.

To get an API key, first create a Forefront AI account, then visit the link below.

- https://platform.forefront.ai/app/api-keys


## [Forefront AI Documentation](https://docs.forefront.ai/)

[Forefront AI documentation](https://docs.forefront.ai/) is available [here](https://docs.forefront.ai/).
