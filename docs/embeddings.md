# Embeddings

## Table of Contents

1. [Embeddings Model Aliases](#embeddings-model-aliases)
2. [Embeddings Alias Values](#embeddings-alias-values)
    - [AI21 Studio](#ai21)
    - [AIMLAPI](#aimlapi)
    - [Anyscale](#anyscale)
    - [Cloudflare AI](#cloudflareai)
    - [Cohere](#cohere)
    - [DeepInfra](#deepinfra)
    - [Fireworks AI](#fireworksai)
    - [Google Gemini](#gemini)
    - [Hugging Face Inference](#huggingface)
    - [Lamini](#lamini)
    - [LLaMA.CPP](#llamacpp)
    - [Mistral AI](#mistralai)
    - [Ollama](#ollama)
    - [OpenAI](#openai)
    - [Together AI](#togetherai)
    - [Voyage AI](#voyage)
    - [Watsonx AI](#watsonxai)

## Embeddings Model Aliases

To simplify using LLMInterface.embeddings(), you can use the following embeddings model aliases:

- `default`
- `large`
- `small`

If no model is passed, the system will use the default model for the LLM provider. If you'd prefer to specify your model by size instead of name, pass `large` or `small`.

Aliases can simplify working with multiple LLM providers letting you call different providers with the same model names out of the box.

```javascript
const openaiResult = await LLMInterface.embeddings("openai", "Explain the importance of low latency LLMs", { model: "small" });
const geminiResult = await LLMInterface.embeddings("gemini", "Explain the importance of low latency LLMs", { model: "small" });
```

Changing the aliases is easy:

```javascript
LLMInterface.setEmeddingsModelAlias("openai", "default", "text-embedding-3-large");
```

## Embeddings Alias Values

### [AI21 Studio](providers/ai21.md) ![ai21](https://samestrin.github.io/media/llm-interface/icons/ai21.png)

- This provider does not support model selection. Model names passed will be ignored.

### [AIMLAPI](providers/aimlapi.md) ![aimlapi](https://samestrin.github.io/media/llm-interface/icons/aimlapi.png)

- `default`: text-embedding-ada-002
- `large`: text-embedding-3-large
- `small`: text-embedding-3-small

### [Anyscale](providers/anyscale.md) ![anyscale](https://samestrin.github.io/media/llm-interface/icons/anyscale.png)

- `default`: thenlper/gte-large
- `large`: thenlper/gte-large
- `small`: BAAI/bge-large-en-v1.5

### [Cloudflare AI](providers/cloudflareai.md) ![cloudflareai](https://samestrin.github.io/media/llm-interface/icons/cloudflareai.png)

- `default`: @cf/baai/bge-base-en-v1.5
- `large`: @cf/baai/bge-large-en-v1.5
- `small`: @cf/baai/bge-small-en-v1.5

### [Cohere](providers/cohere.md) ![cohere](https://samestrin.github.io/media/llm-interface/icons/cohere.png)

- `default`: embed-english-v3.0
- `large`: embed-english-v3.0
- `small`: embed-english-light-v3.0

### [DeepInfra](providers/deepinfra.md) ![deepinfra](https://samestrin.github.io/media/llm-interface/icons/deepinfra.png)

- `default`: BAAI/bge-base-en-v1.5
- `large`: BAAI/bge-large-en-v1.5
- `small`: BAAI/bge-base-en-v1.5

### [Fireworks AI](providers/fireworksai.md) 

- `default`: nomic-ai/nomic-embed-text-v1.5
- `large`: nomic-ai/nomic-embed-text-v1.5
- `small`: nomic-ai/nomic-embed-text-v1.5

### [Google Gemini](providers/gemini.md) 

- `default`: text-embedding-004
- `large`: text-embedding-004
- `small`: text-embedding-004

### [Hugging Face Inference](providers/huggingface.md) 

- `default`: sentence-transformers/all-mpnet-base-v2
- `large`: sentence-transformers/sentence-t5-large
- `small`: sentence-transformers/all-MiniLM-L6-v2

### [Lamini](providers/lamini.md) ![lamini](https://samestrin.github.io/media/llm-interface/icons/lamini.png)

- `default`: sentence-transformers/all-MiniLM-L6-v2
- `large`: sentence-transformers/all-MiniLM-L6-v2
- `small`: sentence-transformers/all-MiniLM-L6-v2

### [LLaMA.CPP](providers/llamacpp.md) 

- `default`: none
- `large`: none
- `small`: none

### [Mistral AI](providers/mistralai.md) ![mistralai](https://samestrin.github.io/media/llm-interface/icons/mistralai.png)

- `default`: mistral-embed
- `large`: mistral-embed
- `small`: mistral-embed

### [Ollama](providers/ollama.md) 

- `default`: all-minilm
- `large`: all-minilm
- `small`: all-minilm

### [OpenAI](providers/openai.md) 

- `default`: text-embedding-ada-002
- `large`: text-embedding-3-large
- `small`: text-embedding-3-small

### [Together AI](providers/togetherai.md) ![togetherai](https://samestrin.github.io/media/llm-interface/icons/togetherai.png)

- `default`: bert-base-uncased
- `large`: BAAI/bge-large-en-v1.5
- `small`: BAAI/bge-base-en-v1.5 

### [Voyage AI](providers/voyage.md) 

- `default`: voyage-2
- `large`: voyage-large-2
- `small`: voyage-2

### [Watsonx AI](providers/watsonxai.md) 

- `default`: ibm/slate-125m-english-rtrvr
- `large`: ibm/slate-125m-english-rtrvr
- `small`: ibm/slate-30m-english-rtrvr

