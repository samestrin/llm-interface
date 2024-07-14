![Anthropic](https://cdn.sanity.io/images/4zrzovbb/website/4b8bc05b916dc4fbaf2543f76f946e5587aaeb43-2400x1260.png)

# [Anthropic](https://anthropic.com)

Anthropic is an AI research and safety company focused on developing reliable, interpretable, and steerable AI systems. Founded by former members of OpenAI, Anthropic prioritizes the safe and ethical development of artificial intelligence. Their research focuses on understanding and mitigating potential risks associated with advanced AI systems. The company's flagship model, Claude, is designed for safety and is accessible through a user-friendly chat interface and an API.

## Interface Name

- `anthropic`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'anthropic': process.env.ANTHROPIC_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('anthropic', 'Explain the importance of low latency LLMs.');
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

- `default`: claude-3-sonnet-20240229
- `large`: claude-3-opus-20240229
- `small`: claude-3-haiku-20240307
- `agent`: claude-3-sonnet-20240229


## Options

The following parameters can be passed through `options`.

- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `metadata`: Additional information about the input or environment that might influence the AI's response.
- `stop_sequences`: Sequences that indicate to the model when to stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `system`: Defines the role and instructions for the system component of the AI interaction, guiding the overall behavior.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `tool_choice`: Specifies which external tools the AI can use to assist in generating its response.
- `tools`: A list of external tools available for the AI to use in generating responses.
- `top_k`: The number of highest probability vocabulary tokens to keep for top-k sampling.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


### Features

- Streaming
- Tools


## Getting an API Key

**Commercial (Credit Card Required)**: The Anthropic API is a commercial product and requires a credit card to get started.

To get an API key, first create an Anthropic account, then visit the link below.

- https://console.anthropic.com/settings/keys


## [Anthropic Documentation](https://docs.anthropic.com/en/api/getting-started)

[Anthropic documentation](https://docs.anthropic.com/en/api/getting-started) is available [here](https://docs.anthropic.com/en/api/getting-started).


## [Anthropic X](https://www.x.com/AnthropicAI)

![@AnthropicAI](https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_normal.jpg)

[@AnthropicAI](https://www.x.com/AnthropicAI)


