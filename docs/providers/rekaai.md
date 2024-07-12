![Reka AI](http://static1.squarespace.com/static/66118bc053ae495c0021e80f/t/661d8ad31654cb7ecf49c127/1713212115473/reka+logo.jpg?format=1500w)

# [Reka AI](https://www.reka.ai)

Reka is an artificial intelligence (AI) startup focused on developing multimodal language models. Their team of researchers and engineers, with backgrounds from DeepMind, Google Brain, and FAIR, aims to build useful AI that empowers organizations and businesses. Reka's models are designed to process and generate text, images, and other forms of data, enabling a wide range of applications in areas such as content creation, customer service, and data analysis. They are committed to making AI accessible, offering both pre-trained models and tools for building custom solutions.

## Interface Name

- `rekaai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'rekaai': process.env.REKAAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('rekaai', 'Explain the importance of low latency LLMs.');
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

- `default`: reka-core
- `large`: reka-core
- `small`: reka-edge
- `agent`: reka-core


## Options

The following values can be passed through `options`.

- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `seed`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_k`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._
- `use_search_engine`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming


## Getting an API Key

**Commercial with Free Trial:** The Reka AI API is a commercial product but offers a $5.00 credit to get started. A credit card is required.

To get an API key, first create a Reka AI account, then visit the link below.

- https://platform.reka.ai/apikeys


## [Reka AI Documentation](https://docs.reka.ai/quick-start)

[Reka AI documentation](https://docs.reka.ai/quick-start) is available [here](https://docs.reka.ai/quick-start).
