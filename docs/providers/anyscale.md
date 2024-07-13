![Anyscale](https://images.ctfassets.net/xjan103pcp94/cpKmR4XdiqNwmVIPyso3s/420926d0c276ff5e80faae17200f2acb/Webinar-Anyscale_logo.png)

# [Anyscale](https://anyscale.com)

Anyscale is a leading AI platform that enables developers and AI teams to build, deploy, and scale AI applications with unmatched efficiency. Built on the Ray open-source framework, Anyscale offers a fully managed platform with capabilities like orchestration, experiment management, and hyperparameter tuning. Anyscale is used by thousands of organizations to accelerate their AI development, providing a seamless experience from laptop to production across diverse AI workloads.

## Interface Name

- `anyscale`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'anyscale': process.env.ANYSCALE_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('anyscale', 'Explain the importance of low latency LLMs.');
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

- `default`: mistralai/Mixtral-8x22B-Instruct-v0.1
- `large`: meta-llama/Llama-3-70b-chat-hf
- `small`: mistralai/Mistral-7B-Instruct-v0.1
- `agent`: mistralai/Mixtral-8x22B-Instruct-v0.1

### Embeddings Model Aliases

- `default`: thenlper/gte-large
- `large`: thenlper/gte-large
- `small`: BAAI/bge-large-en-v1.5


## Options

The following parameters can be passed through `options`.

- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


## Features

- Embeddings


## Getting an API Key

**Commercial with Free Trial**: The Anyscale API does not require a credit card and comes with $10 credit to get started.

To get an API key, first create an Anyscale account, then visit the link below.

- https://console.anyscale.com/v2/api-keys


## [Anyscale Documentation](https://docs.anyscale.com/reference/)

[Anyscale documentation](https://docs.anyscale.com/reference/) is available [here](https://docs.anyscale.com/reference/).
