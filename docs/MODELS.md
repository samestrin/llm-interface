# Models

## Table of Contents

1. [Model Aliases](#model-aliases)
2. [Default Aliases](#default-aliases)
  - [AI21 Studio](#ai21-studio)
  - [AIML API](#aiml-api)
  - [Anyscale](#anyscale)
  - [Anthropic](#anthropic)
  - [Bigmodel](#bigmodel)
  - [Cloudflare AI](#cloudflare-ai)
  - [Cohere](#cohere)
  - [Corcel](#corcel)
  - [DeepInfra](#deepinfra)
  - [Deepseek](#deepseek)
  - [Fireworks AI](#fireworks-ai)
  - [Forefront](#forefront)
  - [Friendli AI](#friendli-ai)
  - [Google Gemini](#google-gemini)
  - [Goose AI](#goose-ai)
  - [Groq](#groq)
  - [Hugging Face](#hugging-face)
  - [Hyperbee AI](#hyperbee-ai)
  - [Lamini](#lamini)
  - [LLaMA.cpp](#llamacpp)
  - [Mistral AI](#mistral-ai)
  - [Monster API](#monster-api)
  - [Neets AI](#neets-ai)
  - [Novita AI](#novita-ai)
  - [NVIDIA](#nvidia)
  - [Octo AI](#octo-ai)
  - [Ollama](#ollama)
  - [OpenAI](#openai)
  - [Perplexity](#perplexity)
  - [Reka AI](#reka-ai)
  - [Replicate](#replicate)
  - [Shuttle AI](#shuttle-ai)
  - [TheB.AI](#thebai)
  - [Together AI](#together-ai)
  - [watsonx.ai](#watsonxai)
  - [Writer](#writer)

## Model Aliases

To make using `llm-interface` easier to use, you can take advantage of model aliases:

- `default`
- `large`
- `small`

When `default` or no model is passed, the system will use the default model for the LLM provider. If you'd prefer to specify your model by size instead of name, pass `large` or `small`.

Aliases can simplify working with multiple LLM providers letting you call different providers with the same model names out of the box. If you are unhappy with the defaults, you can always set your own:

"""javascript
LLMInterface.setModelAlias("openai", "default", "gpt-3.5-turbo");
"""

## Default Aliases

### AI21 Studio

- `default`: jamba-instruct
- `large`: jamba-instruct
- `small`: jamba-instruct

### AIML API

- `default`: gpt-3.5-turbo-16k
- `large`: Qwen1.5-72B-Chat
- `small`: Qwen1.5-0.5B-Chat

### Anyscale

- `default`: Mixtral-8x22B-Instruct-v0.1
- `large`: Llama-3-70b-chat-hf
- `small`: Mistral-7B-Instruct-v0.1

### Anthropic

- `default`: claude-3-sonnet-20240229
- `large`: claude-3-opus-20240229
- `small`: claude-3-haiku-20240307

### Bigmodel

- `default`: glm-4
- `large`: glm-4-alltools
- `small`: glm-4

### Cloudflare AI

- `default`: @cf/meta/llama-3-8b-instruct
- `large`: @hf/thebloke/llama-2-13b-chat-awq
- `small`: @cf/tinyllama/tinyllama-1.1b-chat-v1.0

### Cohere

- `default`: command-r
- `large`: command-r-plus
- `small`: command-light

### Corcel

- `default`: llama-3
- `large`: gpt-4o
- `small`: llama-3

### DeepInfra

- `default`: openchat-3.6-8b
- `large`: Nemotron-4-340B-Instruct
- `small`: WizardLM-2-7B

### Deepseek

- `default`: deepseek-chat
- `large`: deepseek-chat
- `small`: deepseek-chat

### Fireworks AI

- `default`: llama-v3-8b-instruct
- `large`: llama-v3-70b-instruct
- `small`: phi-3-mini-128k-instruct

### Forefront

- `default`: Mistral-7B-Instruct-v0.2-chatml
- `large`: Mistral-7B-Instruct-v0.2-chatml
- `small`: Mistral-7B-Instruct-v0.2-chatml

### Friendli AI

- `default`: mixtral-8x7b-instruct-v0-1
- `large`: meta-llama-3-70b-instruct
- `small`: meta-llama-3-8b-instruct

### Google Gemini

- `default`: gemini-1.5-flash
- `large`: gemini-1.5-pro
- `small`: gemini-1.5-flash

### Goose AI

- `default`: gpt-neo-20b
- `large`: gpt-neo-20b
- `small`: gpt-neo-125m

### Groq

- `default`: llama3-8b-8192
- `large`: llama3-70b-8192
- `small`: gemma-7b-it

### Hugging Face

- `default`: meta-llama/Meta-Llama-3-8B-Instruct
- `large`: meta-llama/Meta-Llama-3-8B-Instruct
- `small`: microsoft/Phi-3-mini-4k-instruct

### Hyperbee AI

- `default`: hive
- `large`: gpt-4o
- `small`: small-bee-en

### Lamini

- `default`: meta-llama/Meta-Llama-3-8B-Instruct
- `large`: meta-llama/Meta-Llama-3-8B-Instruct
- `small`: microsoft/phi-2

### LLaMA.cpp

- `default`: gpt-3.5-turbo
- `large`: gpt-3.5-turbo
- `small`: gpt-3.5-turbo

### Mistral AI

- `default`: mistral-large-latest
- `large`: mistral-large-latest
- `small`: mistral-small-latest

### Monster API

- `default`: microsoft/Phi-3-mini-4k-instruct
- `large`: meta-llama/Meta-Llama-3-8B-Instruct
- `small`: microsoft/Phi-3-mini-4k-instruct

### Neets AI

- `default`: Neets-7B
- `large`: mistralai/Mixtral-8X7B-Instruct-v0.1
- `small`: Neets-7B

### Novita AI

- `default`: meta-llama/llama-3-8b-instruct
- `large`: meta-llama/llama-3-70b-instruct
- `small`: meta-llama/llama-3-8b-instruct

### NVIDIA

- `default`: nvidia/llama3-chatqa-1.5-8b
- `large`: nvidia/nemotron-4-340b-instruct
- `small`: microsoft/phi-3-mini-128k-instruct

### Octo AI

- `default`: mistral-7b-instruct
- `large`: mixtral-8x22b-instruct
- `small`: mistral-7b-instruct

### Ollama

- `default`: llama3
- `large`: llama3
- `small`: llama3

### OpenAI

- `default`: gpt-3.5-turbo
- `large`: gpt-4o
- `small`: gpt-3.5-turbo

### Perplexity

- `default`: llama-3-sonar-large-32k-online
- `large`: llama-3-sonar-large-32k-online
- `small`: llama-3-sonar-small-32k-online

### Reka AI

- `default`: reka-core
- `large`: reka-core
- `small`: reka-edge

### Replicate

- `default`: mistralai/mistral-7b-instruct-v0.2
- `large`: meta/meta-llama-3-70b-instruct
- `small`: mistralai/mistral-7b-instruct-v0.2

### Shuttle AI

- `default`: shuttle-2-turbo
- `large`: wizardlm-2-70b
- `small`: gpt-3.5-turbo-0125

### TheB.AI

- `default`: gpt-4-turbo
- `large`: llama-3-70b-chat
- `small`: llama-2-7b-chat

### Together AI

- `default`: deepseek-ai/deepseek-llm-67b-chat
- `large`: NousResearch/Nous-Hermes-2-Mixtral-8x22B-Instruct
- `small`: Qwen/Qwen1.5-0.5B-Chat

### watsonx.ai

- `default`: meta-llama/llama-2-13b-chat
- `large`: meta-llama/llama-3-70b-instruct
- `small`: google/flan-t5-xxl

### Writer

- `default`: palmyra-x-002-32k
- `large`: palmyra-x-002-32k
- `small`: palmyra-x-002-32k
