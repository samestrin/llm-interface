# Models

`llm-prepare` provides three different model aliases for each LLM provider. If a model is not specified, `llm-prepare` will always use the `default`.

## Model Aliases

To make using `llm-interface` easier, you can take advantage of model aliases:

- `default`
- `large`
- `small`

When `default` or no model is passed, the system will use the default model for the LLM provider. If you'd prefer to specify your model by size instead of name, pass `large` or `small`.

### OpenAI

- `default`: GPT-3.5-turbo (tokens: 16,385)
- `large`: GPT-4.0 (tokens: 128,000)
- `small`: Davinci-002 (tokens: 16,384)

### AI21

- `default`: Jamba-Instruct (tokens: 256,000)
- `large`: Jamba-Instruct (tokens: 256,000)
- `small`: J2-Light (tokens: 2,048)

### Anthropic

- `default`: Claude-3-Opus-20240229 (tokens: 200,000)
- `large`: Claude-3-Opus-20240229 (tokens: 200,000)
- `small`: Claude-3-Haiku-20240307 (tokens: 200,000)

### Cloudflare AI

- `default`: Llama-3-8B-Instruct (tokens: 4,096)
- `large`: Llama-2-13B-Chat-AWQ (tokens: 8,192)
- `small`: TinyLlama-1.1B-Chat-v1.0 (tokens: 2,048)

### Cohere

- `default`: Command-R (tokens: 128,000)
- `large`: Command-R-Plus (tokens: 128,000)
- `small`: Medium (tokens: 2,048)

### Fireworks AI

- `default`: Llama-v3-8B-Instruct (tokens: 8,192)
- `large`: Llama-v3-70B-Instruct (tokens: 8,192)
- `small`: Phi-3-Mini-128K-Instruct (tokens: 128,000)

### Gemini

- `default`: Gemini-1.5-Flash (tokens: 1,048,576)
- `large`: Gemini-1.5-Pro (tokens: 1,048,576)
- `small`: Gemini-Small

### Goose AI

- `default`: GPT-Neo-20B (tokens: 2,048)
- `large`: GPT-Neo-20B (tokens: 2,048)
- `small`: GPT-Neo-125M (tokens: 2,048)

### Groq

- `default`: Llama3-8B-8192 (tokens: 8,192)
- `large`: Llama3-70B-8192 (tokens: 8,192)
- `small`: Gemma-7B-IT (tokens: 8,192)

### Hugging Face

- `default`: Meta-Llama/Meta-Llama-3-8B-Instruct (tokens: 8,192)
- `large`: Meta-Llama/Meta-Llama-3-8B-Instruct (tokens: 8,192)
- `small`: Microsoft/Phi-3-Mini-4K-Instruct (tokens: 4,096)

### Mistral AI

- `default`: Mistral-Large-Latest (tokens: 32,768)
- `large`: Mistral-Large-Latest (tokens: 32,768)
- `small`: Mistral-Small (tokens: 32,768)

### Perplexity

- `default`: Llama-3-Sonar-Large-32K-Online (tokens: 28,000)
- `large`: Llama-3-Sonar-Large-32K-Online (tokens: 28,000)
- `small`: Llama-3-Sonar-Small-32K-Online (tokens: 28,000)

### Reka AI

- `default`: Reka-Core
- `large`: Reka-Core
- `small`: Reka-Edge
