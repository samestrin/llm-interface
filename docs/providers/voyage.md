![Voyage AI](https://samestrin.github.io/media/llm-interface/voyageai.com.1600x900.png)

# Voyage AI

Voyage AI is a technology company that specializes in developing advanced embedding models and rerankers to improve information retrieval tasks for AI applications. Their state-of-the-art models transform unstructured data like documents, images, and audio into numerical vectors that capture semantic meaning, making them easier to search and process. These tools are crucial for building effective retrieval augmented generation (RAG) systems, which are widely used in domain-specific chatbots and other AI applications. Voyage AI aims to empower businesses and developers by providing cutting-edge technology that enhances the accuracy and efficiency of their AI-powered solutions.

## Interface Name

- `voyage`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'voyage': process.env.VOYAGE_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('voyage', 'Explain the importance of low latency LLMs.');
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


### Embeddings

- `default`: voyage-2
- `large`: voyage-large-2
- `small`: voyage-2


## Features

- Embeddings: true


## Getting an API Key

**Free Tier Available (Rate Limited)**: This service is free with rate limits of 3 requests per minute and 10,000 tokens per month. Upgrade to remove limits. 50 million free tokens included.

To get an API key, first create a Voyage AI account, then visit the link below.

- https://dash.voyageai.com/api-keys


## [Voyage AI Documentation](https://docs.voyageai.com/docs/introduction)

[Voyage AI documentation](https://docs.voyageai.com/docs/introduction) is available [here](https://docs.voyageai.com/docs/introduction).
