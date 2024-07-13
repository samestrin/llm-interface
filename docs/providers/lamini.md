![Lamini](https://cdn.prod.website-files.com/65f9ebe58e6225ebad55ef60/6605f028392ea0cba018fbff_Open%20Graph%20Image.png)

# [Lamini](https://lamini.ai)

Lamini is an enterprise-focused AI platform that enables businesses to build and deploy custom large language models (LLMs) with high accuracy and minimal hallucinations. Their platform offers tools like Memory Tuning, which ensures precise factual recall, and guaranteed JSON output for seamless integration with existing applications. Lamini models can be run in various environments, including on-premises and public clouds, with support for both NVIDIA and AMD GPUs. Their solutions cater to diverse industries, emphasizing data security and customization to meet specific business needs.

## Interface Name

- `lamini`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'lamini': process.env.LAMINI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('lamini', 'Explain the importance of low latency LLMs.');
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

- `default`: meta-llama/Meta-Llama-3-8B-Instruct
- `large`: meta-llama/Meta-Llama-3-8B-Instruct
- `small`: microsoft/phi-2
- `agent`: meta-llama/Meta-Llama-3-8B-Instruct

### Embeddings Model Aliases

- `default`: sentence-transformers/all-MiniLM-L6-v2
- `large`: sentence-transformers/all-MiniLM-L6-v2
- `small`: sentence-transformers/all-MiniLM-L6-v2


## Options

The following parameters can be passed through `options`.

- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `output_type`: _Details not available, please refer to the LLM provider documentation._


## Features

- Embeddings


## Getting an API Key

**Free Tier Available:** The Lamini API offers a free plan with 200 inference calls per month (maximum 5,000 total). The API key is immediately accessible upon visiting the link.

To get an API key, first create a Lamini account, then visit the link below.

- https://app.lamini.ai/account


## [Lamini Documentation](https://lamini-ai.github.io/about/)

[Lamini documentation](https://lamini-ai.github.io/about/) is available [here](https://lamini-ai.github.io/about/).
