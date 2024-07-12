![AIMLAPI](https://cdn.prod.website-files.com/65b8f36fa600366bc7cf9a67/65e055f2cce5ca962f833d3f_Group%201000007684.png)

# [AIMLAPI](https://www.aimlapi.com)

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

The following values can be passed through `options`.

- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming
- Embeddings


## Getting an API Key

**Free Tier Available**: The AIMLAPI API offers a free tier and commercial accounts. A credit card is not required for the free tier.

To get an API key, first create an AIMLAPI account, then visit the link below.

- https://aimlapi.com/app/keys


## [AIMLAPI Documentation](https://docs.aimlapi.com/)

[AIMLAPI documentation](https://docs.aimlapi.com/) is available [here](https://docs.aimlapi.com/).
