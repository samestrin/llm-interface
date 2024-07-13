![Groq](https://cdn.prod.website-files.com/5da60b8bfc98fdf11111b791/667d84f156ec37bd39bba262_What%20is%20Groq%20AI%20and%20How%20to%20Use%20It.webp)

# [Groq](https://groq.com)

Groq is a company that develops hardware and software for accelerating artificial intelligence and machine learning workloads. They specialize in creating Tensor Streaming Processor (TSP) architecture, which is designed to optimize the performance and efficiency of AI computations. Groq's technology aims to deliver high performance and low latency for various applications, such as natural language processing, computer vision, and recommendation systems. The company's focus on hardware acceleration distinguishes them in the field of AI infrastructure providers.

## Interface Name

- `groq`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'groq': process.env.GROQ_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('groq', 'Explain the importance of low latency LLMs.');
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

- `default`: llama3-8b-8192
- `large`: llama3-70b-8192
- `small`: gemma-7b-it
- `agent`: llama3-8b-8192


## Options

The following parameters can be passed through `options`.

- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `function_call`: _Details not available, please refer to the LLM provider documentation._
- `functions`: _Details not available, please refer to the LLM provider documentation._
- `logit_bias`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._
- `user`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming
- Functions


## Getting an API Key

**Free**: The Groq API is currently free to use.

To get an API key, first create a Groq account, then visit the link below.

- https://console.groq.com/keys


## [Groq Documentation](https://docs.api.groq.com/index.html)

[Groq documentation](https://docs.api.groq.com/index.html) is available [here](https://docs.api.groq.com/index.html).
