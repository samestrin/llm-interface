![FriendliAI](https://friendli.ai/opengraph-image.png)

# [FriendliAI](https://www.friendli.ai)

FriendliAI is a company focused on making generative AI accessible to all businesses. They provide efficient and scalable solutions for deploying and managing generative AI models, eliminating the complexities often associated with this technology. FriendliAI offers various products, such as Friendli Container, Friendli Dedicated Endpoints, and Friendli Serverless Endpoints, to cater to different needs and budgets. Their mission is to empower companies to innovate and achieve their goals through the effective use of generative AI.

## Interface Name

- `friendliai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'friendliai': process.env.FRIENDLIAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('friendliai', 'Explain the importance of low latency LLMs.');
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

- `default`: mixtral-8x7b-instruct-v0-1
- `large`: meta-llama-3-70b-instruct
- `small`: meta-llama-3-8b-instruct
- `agent`: gemma-7b-it


## Options

The following parameters can be passed through `options`.

- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `response_format`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `timeout_microseconds`: _Details not available, please refer to the LLM provider documentation._


### Features

- Native JSON Mode
- Streaming


## Getting an API Key

**Commercial with Free Trial**: The Friendli AI API is a commercial product but offers a $5.00 credit to get started.

To get an API key, first create a FriendliAI account, then visit the link below.

- https://suite.friendli.ai/user-settings/tokens


## [FriendliAI Documentation](https://docs.friendli.ai/)

[FriendliAI documentation](https://docs.friendli.ai/) is available [here](https://docs.friendli.ai/).
