![Cloudflare AI](https://cf-assets.www.cloudflare.com/slt3lc6tev37/2FNnxFZOBEha1W2MhF44EN/e9438de558c983ccce8129ddc20e1b8b/CF_MetaImage_1200x628.png)

# [Cloudflare AI](https://cloudflare.com)

Cloudflare, Inc. is a leading web performance and security company that offers a range of services to enhance website speed, reliability, and protection. Their Cloudflare AI platform focuses on leveraging artificial intelligence and machine learning to optimize content delivery, mitigate threats, and improve user experiences. Cloudflare AI's capabilities include content-based asset creation, intelligent routing, automated threat detection, and personalized content recommendations, all aimed at making the internet faster, safer, and more efficient for businesses and users alike.

## Interface Name

- `cloudflareai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({
  cloudflareai: [
    process.env.CLOUDFLAREAI_API_KEY,
    process.env.CLOUDFLAREAI_ACCOUNT_ID,
  ],
});

async function main() {
  try {
    const response = await LLMInterface.sendMessage(
      'cloudflareai',
      'Explain the importance of low latency LLMs.',
    );
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

- `default`: @cf/meta/llama-3-8b-instruct
- `large`: @hf/thebloke/llama-2-13b-chat-awq
- `small`: @cf/tinyllama/tinyllama-1.1b-chat-v1.0
- `agent`: @cf/meta/llama-3-8b-instruct

### Embeddings Model Aliases

- `default`: @cf/baai/bge-base-en-v1.5
- `large`: @cf/baai/bge-large-en-v1.5
- `small`: @cf/baai/bge-small-en-v1.5

## Options

The following parameters can be passed through `options`.

- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.

### Features

- Functions
- Embeddings

## Getting an API Key

**Free Tier Available**: The Cloudflare AI API offers a free tier and commercial accounts. A credit card is not required for the free tier.

To get an API key, first create a Cloudflare AI account, then visit the link below.

- https://dash.cloudflareai.com/profile/api-tokens

## [Cloudflare AI Documentation](https://developers.cloudflare.com/workers-ai/)

[Cloudflare AI documentation](https://developers.cloudflare.com/workers-ai/) is available [here](https://developers.cloudflare.com/workers-ai/).
