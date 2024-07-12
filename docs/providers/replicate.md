![Replicate](https://replicate.com/_homepage-assets/og.QA4c4pBO.png)

# [Replicate](https://www.replicate.com)

Replicate is a platform that simplifies the deployment and scaling of machine learning models. It offers a wide range of pre-trained models accessible through a simple API, eliminating the complexities of infrastructure management. Users can effortlessly run models with a single API call and scale their usage seamlessly. Additionally, Replicate allows developers to deploy custom models using Cog, their open-source tool, providing flexibility for specific AI applications. By democratizing access to machine learning capabilities, Replicate empowers businesses and individuals to harness the power of AI without extensive technical expertise.

## Interface Name

- `replicate`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'replicate': process.env.REPLICATE_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('replicate', 'Explain the importance of low latency LLMs.');
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

- `default`: mistralai/mistral-7b-instruct-v0.2
- `large`: meta/meta-llama-3-70b-instruct
- `small`: mistralai/mistral-7b-instruct-v0.2
- `agent`: meta/meta-llama-3-70b-instruct


## Options

The following values can be passed through `options`.

- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming: true


## Getting an API Key

**Free Tier Available:** The Replicate API is a commercial product but offers a free tier. No credit card is required for the free tier.

To get an API key, first create a Replicate account, then visit the link below.

- https://platform.reka.ai/apikeys


## [Replicate Documentation](https://replicate.com/docs)

[Replicate documentation](https://replicate.com/docs) is available [here](https://replicate.com/docs).
