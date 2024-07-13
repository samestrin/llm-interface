![HyperBee AI](https://samestrin.github.io/media/llm-interface/hyperbee.ai.1024x641.png)

# [HyperBee AI](https://www.hyperbee.ai)

HyperBeeAI is an artificial intelligence (AI) company that develops small-footprint language models (LLMs) designed for on-premises deployment. Their technology aims to reduce computing costs and enhance data privacy for businesses by enabling the use of powerful AI capabilities locally. HyperBeeAI's platform includes a proprietary framework for training and deploying customized LLMs, addressing the growing demand for efficient and secure AI solutions in various industries.

## Interface Name

- `hyperbeeai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'hyperbeeai': process.env.HYPERBEEAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('hyperbeeai', 'Explain the importance of low latency LLMs.');
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

- `default`: hive
- `large`: gpt-4o
- `small`: gemini-1.5-flash
- `agent`: gpt-4o


## Options

The following parameters can be passed through `options`.

- `add_generation_prompt`: _Details not available, please refer to the LLM provider documentation._
- `best_of`: _Details not available, please refer to the LLM provider documentation._
- `echo`: _Details not available, please refer to the LLM provider documentation._
- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `ignore_eos`: _Details not available, please refer to the LLM provider documentation._
- `include_stop_str_in_output`: _Details not available, please refer to the LLM provider documentation._
- `input_value`: _Details not available, please refer to the LLM provider documentation._
- `json_schema`: _Details not available, please refer to the LLM provider documentation._
- `language`: _Details not available, please refer to the LLM provider documentation._
- `length_penalty`: _Details not available, please refer to the LLM provider documentation._
- `logit_bias`: _Details not available, please refer to the LLM provider documentation._
- `logprobs`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `min_p`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `optimization`: _Details not available, please refer to the LLM provider documentation._
- `output_mode`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `repetition_penalty`: _Details not available, please refer to the LLM provider documentation._
- `skip_special_tokens`: _Details not available, please refer to the LLM provider documentation._
- `spaces_between_special_tokens`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stop_token_ids`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_k`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._
- `use_beam_search`: _Details not available, please refer to the LLM provider documentation._
- `user`: _Details not available, please refer to the LLM provider documentation._


### Features

- Native JSON Mode
- Streaming


## Getting an API Key

**Commercial (Details Pending)**: The Hyperbee AI API is a commercial product.

To get an API key, first create a HyperBee AI account, then visit the link below.

- https://platform.hyperbee.ai/keys


## [HyperBee AI Documentation](https://docs.hyperbee.ai/api)

[HyperBee AI documentation](https://docs.hyperbee.ai/api) is available [here](https://docs.hyperbee.ai/api).
