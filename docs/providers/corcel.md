![Corcel](https://corcel.io/opengraph-image.png?7dc7fa422d541b32)

# [Corcel](https://corcel.io)

Corcel is a platform that leverages decentralized AI to offer a variety of tools and applications. It provides access to cutting-edge AI models for tasks like web searching, image generation from text prompts, and interacting with advanced language models. Corcel is powered by a range of both closed and open-source models, ensuring users have access to the latest AI capabilities. The platform boasts a user-friendly interface and is available for free.

## Interface Name

- `corcel`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'corcel': process.env.CORCEL_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('corcel', 'Explain the importance of low latency LLMs.');
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

- `default`: gpt-4-turbo-2024-04-09
- `large`: gpt-4o
- `small`: cortext-lite
- `agent`: gemini-pro


## Options

The following parameters can be passed through `options`.

- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


### Features

- Streaming


## Getting an API Key

**Commercial with Free Trial**: The Corcel API is a commercial product but offers a $1 credit to get started. No credit card is required initially.

To get an API key, first create a Corcel account, then visit the link below.

- https://app.corcel.io/dashboard


## [Corcel Documentation](https://docs.corcel.io/reference/the-corcel-api)

[Corcel documentation](https://docs.corcel.io/reference/the-corcel-api) is available [here](https://docs.corcel.io/reference/the-corcel-api).
