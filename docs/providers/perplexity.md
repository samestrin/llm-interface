![Perplexity AI](https://assets.bizclikmedia.net/1800/b9c92286e658119663b97a2267aee9d1:0006bf344b145b7046bf9b5f43b7a786/perplexity-logo.webp)

# Perplexity AI

Perplexity AI is a cutting-edge answer engine that utilizes large language models (LLMs) to provide accurate and informative responses to user inquiries. By leveraging the power of AI, Perplexity AI aims to enhance the search experience by delivering concise answers along with relevant sources, saving users time and effort. Additionally, Perplexity AI offers features like summarizing information from web pages and generating creative content, making it a versatile tool for research, learning, and exploring new ideas.

## Interface Name

- `perplexity`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'perplexity': process.env.PERPLEXITY_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('perplexity', 'Explain the importance of low latency LLMs.');
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

- `default`: llama-3-sonar-large-32k-online
- `large`: llama-3-sonar-large-32k-online
- `small`: llama-3-sonar-small-32k-online
- `agent`: llama-3-sonar-large-32k-online


## Options

The following parameters can be passed through `options`.

- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `return_citations`: _Details not available, please refer to the LLM provider documentation._
- `return_images`: _Details not available, please refer to the LLM provider documentation._
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_k`: The number of highest probability vocabulary tokens to keep for top-k sampling.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


### Features

- Streaming


## Getting an API Key

**Commercial (Credit Card Required):** The Perplexity API requires a credit card to get started.

To get an API key, first create a Perplexity AI account, then visit the link below.

- https://www.perplexity.ai/settings/api


## [Perplexity AI Documentation](https://docs.perplexity.ai/)

[Perplexity AI documentation](https://docs.perplexity.ai/) is available [here](https://docs.perplexity.ai/).
