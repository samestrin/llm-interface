# Models

## Table of Contents

1. [Model Aliases](#model-aliases)
2. [Model Alias Values](#model-alias-values)
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

## Model Aliases

To simplify using LLMInterface.sendMessage(), you can use the following model aliases:

- `default`
- `large`
- `small`
- `agent`

If no model is passed, the system will use the default model for the LLM provider. If you'd prefer to specify your model by size instead of name, pass `large` or `small`.

Aliases can simplify working with multiple LLM providers letting you call different providers with the same model names out of the box.

```javascript
const openaiResult = await LLMInterface.sendMessage("openai", "Explain the importance of low latency LLMs", { model: "small" });
const geminiResult = await LLMInterface.sendMessage("gemini", "Explain the importance of low latency LLMs", { model: "small" });
```

Changing the aliases is easy:

```javascript
LLMInterface.setModelAlias("openai", "default", "gpt-3.5-turbo");
```

## Model Alias Values

### [AI21 Studio](providers/ai21.md) ![ai21](https://samestrin.github.io/media/llm-interface/icons/ai21.png)


### [AIMLAPI](providers/aimlapi.md) ![aimlapi](https://samestrin.github.io/media/llm-interface/icons/aimlapi.png)


### [Anyscale](providers/anyscale.md) ![anyscale](https://samestrin.github.io/media/llm-interface/icons/anyscale.png)


### [Cloudflare AI](providers/cloudflareai.md) ![cloudflareai](https://samestrin.github.io/media/llm-interface/icons/cloudflareai.png)


### [Cohere](providers/cohere.md) ![cohere](https://samestrin.github.io/media/llm-interface/icons/cohere.png)


### [DeepInfra](providers/deepinfra.md) ![deepinfra](https://samestrin.github.io/media/llm-interface/icons/deepinfra.png)


### [Fireworks AI](providers/fireworksai.md) 


### [Google Gemini](providers/gemini.md) 


### [Hugging Face Inference](providers/huggingface.md) 


### [Lamini](providers/lamini.md) ![lamini](https://samestrin.github.io/media/llm-interface/icons/lamini.png)


### [LLaMA.CPP](providers/llamacpp.md) 


### [Mistral AI](providers/mistralai.md) ![mistralai](https://samestrin.github.io/media/llm-interface/icons/mistralai.png)


### [Ollama](providers/ollama.md) 


### [OpenAI](providers/openai.md) 


### [Together AI](providers/togetherai.md) ![togetherai](https://samestrin.github.io/media/llm-interface/icons/togetherai.png)


### [Voyage AI](providers/voyage.md) 


### [Watsonx AI](providers/watsonxai.md) 

