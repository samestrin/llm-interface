![OpenAI](https://images.ctfassets.net/kftzwdyauwt9/3KGOHkSXu53naMuSFNaiwv/f1d12ca1f37c1c3d2c47e846f98a9fc0/openai.jpg?w=1600&h=900&fit=fill)

# OpenAI

OpenAI is an artificial intelligence (AI) research and deployment company. They aim to ensure that artificial general intelligence (AGI)—by which they mean highly autonomous systems that outperform humans at most economically valuable work—benefits all of humanity. OpenAI conducts fundamental, long-term research toward the creation of safe AGI. They also build and release AI systems such as ChatGPT and DALL-E, with the goal of pushing the boundaries of AI capabilities while prioritizing ethical considerations and safety. OpenAI is dedicated to ensuring that their technology is used responsibly and for the betterment of society.

## Interface Name

- `openai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'openai': process.env.OPENAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('openai', 'Explain the importance of low latency LLMs.');
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

- `default`: gpt-3.5-turbo
- `large`: gpt-4o
- `small`: gpt-3.5-turbo
- `agent`: gpt-4o

### Embeddings

- `default`: text-embedding-ada-002
- `large`: text-embedding-3-large
- `small`: text-embedding-3-small


## Options

The following values can be passed through `options`.

- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `function_call`: _Details not available, please refer to the LLM provider documentation._
- `functions`: _Details not available, please refer to the LLM provider documentation._
- `logit_bias`: _Details not available, please refer to the LLM provider documentation._
- `logprobs`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `parallel_tool_calls`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `response_format`: _Details not available, please refer to the LLM provider documentation._
- `seed`: _Details not available, please refer to the LLM provider documentation._
- `service_tier`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `stream_options`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `tool_choice`: _Details not available, please refer to the LLM provider documentation._
- `tools`: _Details not available, please refer to the LLM provider documentation._
- `top_logprobs`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._
- `user`: _Details not available, please refer to the LLM provider documentation._


### Features

- Native JSON Mode
- Streaming
- Functions
- Tools
- Embeddings


## Getting an API Key

**Commercial (Credit Card Required)**: The OpenAI API is a commercial product and requires a credit card to get started.

To get an API key, first create an OpenAI account, then visit the link below.

- https://platform.openai.com/api-keys


## [OpenAI Documentation](https://platform.openai.com/docs/overview)

[OpenAI documentation](https://platform.openai.com/docs/overview) is available [here](https://platform.openai.com/docs/overview).
