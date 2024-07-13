![Anthropic](https://cdn.sanity.io/images/4zrzovbb/website/4b8bc05b916dc4fbaf2543f76f946e5587aaeb43-2400x1260.png)

# [Anthropic](https://www.anthropic.com)

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

- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `metadata`: _Details not available, please refer to the LLM provider documentation._
- `stop_sequences`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `system`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `tool_choice`: _Details not available, please refer to the LLM provider documentation._
- `tools`: _Details not available, please refer to the LLM provider documentation._
- `top_k`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


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

Anthropic
