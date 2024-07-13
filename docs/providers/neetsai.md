![Neets.ai](https://neets.ai/share.jpg)

# [Neets.ai](https://neets.ai)

Neets.ai offers a cloud-based platform for text-to-speech (TTS) and conversational AI solutions. Their Text-to-Speech API allows developers to convert text into natural-sounding speech using a variety of voices and languages. Additionally, their Conversational AI API provides tools for building chatbots and virtual assistants capable of engaging in real-time conversations. Neets.ai leverages deep learning and natural language processing (NLP) techniques to deliver high-quality and customizable solutions for businesses and developers seeking to integrate voice and conversational capabilities into their applications and services.

## Interface Name

- `neetsai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'neetsai': process.env.NEETSAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('neetsai', 'Explain the importance of low latency LLMs.');
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

- `default`: Neets-7B
- `large`: mistralai/Mixtral-8X7B-Instruct-v0.1
- `small`: Neets-7B


## Options

The following parameters can be passed through `options`.

- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `response_format`: _Details not available, please refer to the LLM provider documentation._
- `seed`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming


## Getting an API Key

**Free Tier Available:** The Neets.ai API is a commercial product but offers a free tier. No credit card is required to get started.

To get an API key, first create a Neets.ai account, then visit the link below.

- https://neets.ai/keys


## [Neets.ai Documentation](https://docs.neets.ai/reference/getting-started)

[Neets.ai documentation](https://docs.neets.ai/reference/getting-started) is available [here](https://docs.neets.ai/reference/getting-started).
