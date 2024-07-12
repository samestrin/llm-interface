# [Novita AI](https://www.novita.ai)

Novita AI is a platform that provides a comprehensive suite of APIs for various artificial intelligence applications. It offers over 100 APIs, including image generation and editing with access to thousands of models, as well as training APIs for building custom models. Novita AI aims to simplify the process of integrating AI into various products and services, eliminating the need for expensive GPUs and complex infrastructure. It provides a cost-effective and user-friendly solution for developers and businesses to leverage AI capabilities for their specific needs.

## Interface Name

- `novitaai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'novitaai': process.env.NOVITAAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('novitaai', 'Explain the importance of low latency LLMs.');
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

- `default`: meta-llama/llama-3-8b-instruct
- `large`: meta-llama/llama-3-70b-instruct
- `small`: meta-llama/llama-3-8b-instruct
- `agent`: meta-llama/llama-3-70b-instruct


## Options

The following values can be passed through `options`.

- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `logit_bias`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `repetition_penalty`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming


## Getting an API Key

**Commercial with Free Trial:** The Novita AI API is a commercial product but offers $0.50 of free credit to get started.

To get an API key, first create a Novita AI account, then visit the link below.

- https://novita.ai/dashboard/key


## [Novita AI Documentation](https://novita.ai/get-started/Quick_Start.html)

[Novita AI documentation](https://novita.ai/get-started/Quick_Start.html) is available [here](https://novita.ai/get-started/Quick_Start.html).
