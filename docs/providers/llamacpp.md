![LLaMA.CPP](https://user-images.githubusercontent.com/1991296/230134379-7181e485-c521-4d23-a0d6-f7b3b61ba524.png)

# LLaMA.CPP

LLaMA.CPP is an open-source project that enables inference of Large Language Models (LLMs) like LLaMA on various hardware. Written in C/C++, it boasts minimal dependencies and supports diverse platforms, from Apple Silicon to NVIDIA GPUs. Notably, it excels in quantization techniques, reducing model sizes and accelerating inference speeds.  LLaMA.CPP democratizes access to powerful AI capabilities, allowing users to run sophisticated language models on consumer-grade devices.

LLaMA.CPP uses `n_predict` instead of `max_tokens`; however you can safely use `max_tokens` because it will be converted automatically. To use embeddings you will also need to start your webserver with `--embedding` argument and an appropriate model. _The expected port is `8080`._

## Interface Name

- `llamacpp`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'llamacpp': process.env.LLAMACPP_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('llamacpp', 'Explain the importance of low latency LLMs.');
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

- `default`: gpt-3.5-turbo
- `large`: gpt-3.5-turbo
- `small`: gpt-3.5-turbo
- `agent`: openhermes

### Embeddings Model Aliases

- `default`: none
- `large`: none
- `small`: none


## Options

The following parameters can be passed through `options`.

- `cache_prompt`: _Details not available, please refer to the LLM provider documentation._
- `dynatemp_exponent`: _Details not available, please refer to the LLM provider documentation._
- `dynatemp_range`: _Details not available, please refer to the LLM provider documentation._
- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `grammar`: _Details not available, please refer to the LLM provider documentation._
- `id_slot`: _Details not available, please refer to the LLM provider documentation._
- `ignore_eos`: _Details not available, please refer to the LLM provider documentation._
- `image_data`: _Details not available, please refer to the LLM provider documentation._
- `json_schema`: _Details not available, please refer to the LLM provider documentation._
- `logit_bias`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `min_keep`: _Details not available, please refer to the LLM provider documentation._
- `min_p`: _Details not available, please refer to the LLM provider documentation._
- `mirostat`: _Details not available, please refer to the LLM provider documentation._
- `mirostat_eta`: _Details not available, please refer to the LLM provider documentation._
- `mirostat_tau`: _Details not available, please refer to the LLM provider documentation._
- `n_keep`: _Details not available, please refer to the LLM provider documentation._
- `n_probs`: _Details not available, please refer to the LLM provider documentation._
- `penalize_nl`: _Details not available, please refer to the LLM provider documentation._
- `penalty_prompt`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `repeat_last_n`: _Details not available, please refer to the LLM provider documentation._
- `repeat_penalty`: _Details not available, please refer to the LLM provider documentation._
- `samplers`: _Details not available, please refer to the LLM provider documentation._
- `seed`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `system_prompt`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `tfs_z`: _Details not available, please refer to the LLM provider documentation._
- `top_k`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._
- `typical_p`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming
- Embeddings


## Getting an API Key

**No API Key (Local URL):**  This is not a traditional API so no API key is required. However, a URL(s) is required to use this service. (Ensure you have the matching models installed locally)

To get an API key, first create a LLaMA.CPP account, then visit the link below.

- http://localhost:8080/v1/chat/completions


## [LLaMA.CPP Documentation](https://github.com/ggerganov/llama.cpp/blob/master/examples/server/README.md)

[LLaMA.CPP documentation](https://github.com/ggerganov/llama.cpp/blob/master/examples/server/README.md) is available [here](https://github.com/ggerganov/llama.cpp/blob/master/examples/server/README.md).
