![Monster API](https://www.theinsaneapp.com/tools/wp-content/uploads/2023/06/Monster-API-Tool.jpg)

# [Monster API](https://www.monsterapi.ai)

Monster API is a platform that streamlines the deployment and fine-tuning of large language models (LLMs). Their product, MonsterGPT, simplifies the process by using a chat-based interface, eliminating the need for complex technical setup. With MonsterAPI, developers can quickly deploy and customize LLMs for various applications like code generation, sentiment analysis, and classification, without the hassle of managing infrastructure or intricate fine-tuning parameters. The platform aims to make LLM technology more accessible and efficient for a wider range of users.

## Interface Name

- `monsterapi`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'monsterapi': process.env.MONSTERAPI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('monsterapi', 'Explain the importance of low latency LLMs.');
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
- `large`: google/gemma-2-9b-it
- `small`: microsoft/Phi-3-mini-4k-instruct
- `agent`: google/gemma-2-9b-it


## Options

The following parameters can be passed through `options`.

- `add_generation_prompt`: _Details not available, please refer to the LLM provider documentation._
- `add_special_tokens`: _Details not available, please refer to the LLM provider documentation._
- `best_of`: _Details not available, please refer to the LLM provider documentation._
- `early_stopping`: _Details not available, please refer to the LLM provider documentation._
- `echo`: _Details not available, please refer to the LLM provider documentation._
- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `guided_choice`: _Details not available, please refer to the LLM provider documentation._
- `guided_decoding_backend`: _Details not available, please refer to the LLM provider documentation._
- `guided_grammar`: _Details not available, please refer to the LLM provider documentation._
- `guided_json`: _Details not available, please refer to the LLM provider documentation._
- `guided_regex`: _Details not available, please refer to the LLM provider documentation._
- `guided_whitespace_pattern`: _Details not available, please refer to the LLM provider documentation._
- `ignore_eos`: _Details not available, please refer to the LLM provider documentation._
- `include_stop_str_in_output`: _Details not available, please refer to the LLM provider documentation._
- `length_penalty`: _Details not available, please refer to the LLM provider documentation._
- `logit_bias`: _Details not available, please refer to the LLM provider documentation._
- `logprobs`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `min_p`: _Details not available, please refer to the LLM provider documentation._
- `min_tokens`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `repetition_penalty`: _Details not available, please refer to the LLM provider documentation._
- `response_format`: _Details not available, please refer to the LLM provider documentation._
- `seed`: _Details not available, please refer to the LLM provider documentation._
- `skip_special_tokens`: _Details not available, please refer to the LLM provider documentation._
- `spaces_between_special_tokens`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stop_token_ids`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `stream_options`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `tool_choice`: _Details not available, please refer to the LLM provider documentation._
- `tools`: _Details not available, please refer to the LLM provider documentation._
- `top_k`: _Details not available, please refer to the LLM provider documentation._
- `top_logprobs`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._
- `use_beam_search`: _Details not available, please refer to the LLM provider documentation._
- `user`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming
- Tools


## Getting an API Key

**Free Tier Available:** The Monster API is a commercial product but offers a free tier. No credit card is required to get started.

To get an API key, first create a Monster API account, then visit the link below.

- https://monsterapi.ai/user/dashboard


## [Monster API Documentation](https://developer.monsterapi.ai/)

[Monster API documentation](https://developer.monsterapi.ai/) is available [here](https://developer.monsterapi.ai/).
