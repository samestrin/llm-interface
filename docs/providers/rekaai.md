![Reka AI](http://static1.squarespace.com/static/66118bc053ae495c0021e80f/t/661d8ad31654cb7ecf49c127/1713212115473/reka+logo.jpg?format=1500w)

# [Reka AI](https://reka.ai)

Reka is an artificial intelligence (AI) startup focused on developing multimodal language models. Their team of researchers and engineers, with backgrounds from DeepMind, Google Brain, and FAIR, aims to build useful AI that empowers organizations and businesses. Reka's models are designed to process and generate text, images, and other forms of data, enabling a wide range of applications in areas such as content creation, customer service, and data analysis. They are committed to making AI accessible, offering both pre-trained models and tools for building custom solutions.

## Interface Name

- `rekaai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'rekaai': process.env.REKAAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('rekaai', 'Explain the importance of low latency LLMs.');
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

- `default`: reka-core
- `large`: reka-core
- `small`: reka-edge
- `agent`: reka-core


## Options

The following parameters can be passed through `options`.

- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `seed`: A random seed for reproducibility. If specified, the system will attempt to sample deterministically, ensuring repeated requests with the same seed and parameters return the same result. Determinism is not guaranteed.
- `stop`: Up to 4 sequences where the API will stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_k`: The number of highest probability vocabulary tokens to keep for top-k sampling.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.
- `use_search_engine`: Whether to consider using search engine to complete the request; even if this is set to True, the AI might decide to not use search.


### Features

- Streaming


## Getting an API Key

**Commercial with Free Trial:** The Reka AI API is a commercial product but offers a $5.00 credit to get started. A credit card is required.

To get an API key, first create a Reka AI account, then visit the link below.

- https://platform.reka.ai/apikeys


## [Reka AI Documentation](https://docs.reka.ai/quick-start)

[Reka AI documentation](https://docs.reka.ai/quick-start) is available [here](https://docs.reka.ai/quick-start).
