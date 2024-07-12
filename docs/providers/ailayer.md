# [AiLAYER](https://www.ailayer.ai)

AiLAYER offers a service to connect and manage distributed GPU clusters. This allows users to optimize their Ai infrastructure and eliminate waste. AiLAYER accomplishes this by connecting siloed GPU clusters into one large, manageable swarm. This can reduce costs and maximize existing GPU capacity.

## Interface Name

- `ailayer`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'ailayer': process.env.AILAYER_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('ailayer', 'Explain the importance of low latency LLMs.');
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

- `default`: Llama-2-70b
- `large`: Qwen/Qwen1.5-72B-Chat
- `small`: alpaca-7b
- `agent`: Llama-2-70b


## Options

The following values can be passed through `options`.

- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._


## Getting an API Key

**Details Pending**

To get an API key, first create an AiLAYER account, then visit the link below.

- https://ailayer.ai/home/demo

After visiting the URL, click on "Get Your API Key".
