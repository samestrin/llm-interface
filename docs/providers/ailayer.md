![AiLAYER](https://ailayer.ai/assets/logo-d25870d4d7d638be1aeaa85fb0968f5e595a5eaa91d25e592afab96ed2820e21.svg)

# [AiLAYER](https://ailayer.ai)

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

The following parameters can be passed through `options`.

- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.


## Getting an API Key

**Details Pending**

To get an API key, first create an AiLAYER account, then visit the link below.

- https://ailayer.ai/home/demo

After visiting the URL, click on "Get Your API Key".
