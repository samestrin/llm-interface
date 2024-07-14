![AIMLAPI](https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/65e055f2cce5ca962f833d3f_Group%201000007684.png)

# [AIMLAPI](https://aimlapi.com)

AIMLAPI.com is a versatile platform that provides developers with streamlined access to over 200 AI models through a single API. It simplifies the integration of AI capabilities into applications, offering a diverse range of models from industry leaders like OpenAI, Anthropic, and Stability AI. With a focus on quality, stability, and affordability, AIMLAPI.com caters to developers seeking efficient AI solutions for their projects.

## Interface Name

- `aimlapi`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'aimlapi': process.env.AIMLAPI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('aimlapi', 'Explain the importance of low latency LLMs.');
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

- `default`: gpt-3.5-turbo-16k
- `large`: Qwen/Qwen1.5-72B-Chat
- `small`: Qwen/Qwen1.5-0.5B-Chat
- `agent`: gpt-4-32k-0613

### Embeddings Model Aliases

- `default`: text-embedding-ada-002
- `large`: text-embedding-3-large
- `small`: text-embedding-3-small


## Options

The following parameters can be passed through `options`.

- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


### Features

- Streaming
- Embeddings


## Getting an API Key

**Free Tier Available**: The AIMLAPI API offers a free tier and commercial accounts. A credit card is not required for the free tier.

To get an API key, first create an AIMLAPI account, then visit the link below.

- https://aimlapi.com/app/keys


## [AIMLAPI Documentation](https://docs.aimlapi.com/)

[AIMLAPI documentation](https://docs.aimlapi.com/) is available [here](https://docs.aimlapi.com/).
