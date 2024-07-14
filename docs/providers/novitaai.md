![Novita AI](https://samestrin.github.io/media/llm-interface/novitaai.png)

# [Novita AI](https://novita.ai)

Novita AI is a platform that provides a comprehensive suite of APIs for various artificial intelligence applications. It offers over 100 APIs, including image generation and editing with access to thousands of models, as well as training APIs for building custom models. Novita AI aims to simplify the process of integrating AI into various products and services, eliminating the need for expensive GPUs and complex infrastructure. It provides a cost-effective and user-friendly solution for developers and businesses to leverage AI capabilities for their specific needs.

## Interface Name

- `novitaai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'novitaai': process.env.NOVITAAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('novitaai', 'Explain the importance of low latency LLMs.');
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

- `default`: meta-llama/llama-3-8b-instruct
- `large`: meta-llama/llama-3-70b-instruct
- `small`: meta-llama/llama-3-8b-instruct
- `agent`: meta-llama/llama-3-70b-instruct


## Options

The following parameters can be passed through `options`.

- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `logit_bias`: An optional parameter that modifies the likelihood of specified tokens appearing in the model-generated output.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `n`: Specifies the number of responses to generate for each input message. Note that costs are based on the number of generated tokens across all choices. Keeping n as 1 minimizes costs.
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `repetition_penalty`: Penalizes new tokens based on whether they appear in the prompt and the generated text so far. Values greater than 1 encourage the model to use new tokens, while values less than 1 encourage the model to repeat tokens.
- `stop`: Up to 4 sequences where the API will stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


### Features

- Streaming


## Getting an API Key

**Commercial with Free Trial:** The Novita AI API is a commercial product but offers $0.50 of free credit to get started.

To get an API key, first create a Novita AI account, then visit the link below.

- https://novita.ai/dashboard/key


## [Novita AI Documentation](https://novita.ai/get-started/Quick_Start.html)

[Novita AI documentation](https://novita.ai/get-started/Quick_Start.html) is available [here](https://novita.ai/get-started/Quick_Start.html).
