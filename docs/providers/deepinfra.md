![DeepInfra](https://deepinfra.com/deepinfra-logo-512.webp)

# [DeepInfra](https://www.deepinfra.com)

DeepInfra is a platform that allows users to deploy machine learning models. They offer a variety of models, including text-generation, text-to-image, and automatic speech recognition. Users can pay per use for the models they deploy. DeepInfra offers both custom models and pre-trained models. Pre-trained models include openchat/openchat-3.6-8b, nvidia/Nemotron-4-340B-Instruct, and microsoft/WizardLM-2-7B.

## Interface Name

- `deepinfra`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'deepinfra': process.env.DEEPINFRA_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('deepinfra', 'Explain the importance of low latency LLMs.');
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

- `default`: openchat/openchat-3.6-8b
- `large`: nvidia/Nemotron-4-340B-Instruct
- `small`: microsoft/WizardLM-2-7B
- `agent`: Qwen/Qwen2-7B-Instruct

### Embeddings

- `default`: BAAI/bge-base-en-v1.5
- `large`: BAAI/bge-large-en-v1.5
- `small`: BAAI/bge-base-en-v1.5


## Options

The following values can be passed through `options`.

- `echo`: _Details not available, please refer to the LLM provider documentation._
- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `response_format`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `tool_choice`: _Details not available, please refer to the LLM provider documentation._
- `tools`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


### Features

- Native JSON Mode: true
- Streaming: true
- Tools: true
- Embeddings: true


## Getting an API Key

**Commercial with Free Trial**: The DeepInfra API is a commercial product, but new accounts start with a $1.80 credit.

To get an API key, first create a DeepInfra account, then visit the link below.

- https://deepinfra.com/dash/api_keys


## [DeepInfra Documentation](https://deepinfra.com/docs/)

[DeepInfra documentation](https://deepinfra.com/docs/) is available [here](https://deepinfra.com/docs/).


![@DeepInfra](https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_normal.jpg)
[@DeepInfra](https://www.x.com/DeepInfra)

Anthropic
