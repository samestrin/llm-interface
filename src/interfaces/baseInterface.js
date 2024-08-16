/**
 * @file src/interfaces/baseInterface.js
 * @class BaseInterface
 * @description Base class for interfacing with various APIs.
 * @param {string} interfaceName - The name of the interface.
 * @param {string} apiKey - The API key for the API.
 * @param {string} baseURL - The base URL for the API.
 * @param {object} headers - Additional headers for the API requests.
 */
const axios = require('axios');

const {
  getModelByAlias,
  getEmbeddingsModelByAlias,
} = require('../utils/config.js');
const {
  getMessageObject,
  getSimpleMessageObject,
} = require('../utils/utils.js');
const { parseJSON, isEmptyObject } = require('../utils/utils.js');
const { getConfig } = require('../utils/configManager.js');
const {
  LLMInterfaceError,
  EmbeddingsError,
  StreamError,
} = require('../utils/errors.js');

const config = getConfig();
const log = require('loglevel');

// BaseInterface class for interacting with various APIs
class BaseInterface {
  /**
   * Constructor for the BaseInterface class.
   * @param {string} interfaceName - The name of the interface.
   * @param {string} apiKey - The API key for the API.
   * @param {string} baseURL - The base URL for the API.
   * @param {object} headers - Additional headers for the API requests.
   */
  constructor(interfaceName, apiKey, baseURL, headers = {}) {
    this.interfaceName = interfaceName;
    this.apiKey = apiKey;

    this.baseURL = baseURL;
    this.client = axios.create({
      headers: {
        'Content-Type': 'application/json',
        ...headers,
        Authorization: `Bearer ${this.apiKey}`,
      },
      timeout: 20000,
      //signal: controller.signal,
    });
    this.config = config;
  }

  /**
   * Create the appropriate message object.
   * @param {string|object} message - The message to send.
   * @returns {object} The message object.
   * @throws {Error} If the function is not defined in the this.config.
   */
  createMessageObject(message) {
    const createMessageObject =
      this.config[this.interfaceName].createMessageObject;
    const messageObjectFunction =
      global[createMessageObject] || getMessageObject; // added default, so error will never throw

    if (typeof messageObjectFunction !== 'function') {
      throw new LLMInterfaceError(
        `Function '${createMessageObject}' is not defined in the global scope or utils.`,
      );
    }

    return messageObjectFunction(message);
  }

  /**
   * Updates the headers of an Axios client.
   *
   * @param {object} client - The Axios client instance.
   * @param {object} newHeaders - The new headers to set on the Axios client.
   */
  updateHeaders(client, newHeaders) {}

  /**
   * Method to update the message object if needed.
   * Can be overridden by derived classes to transform the message object.
   * @param {object} messageObject - The message object to be updated.
   * @returns {object} The updated message object.
   */
  updateMessageObject(messageObject) {
    return messageObject; // Default implementation does nothing
  }

  /**
   * Method to construct the request URL, can be overridden by derived classes.
   * @param {string} model - The model to use for the request.
   * @returns {string} The request URL.
   */
  getRequestUrl(model) {
    return ''; // Default URL if not overridden
  }

  /**
   * Method to construct the embed request URL, can be overridden by derived classes.
   * @param {string} model - The model to use for the request.
   * @returns {string} The request URL.
   */
  getEmbedRequestUrl(model) {
    return ''; // Default URL if not overridden
  }

  /**
   * Method to adjust options, can be overridden by derived classes.
   * @param {object} optons - The optons to use for the request.
   * @returns {object} The request URL.
   */
  adjustOptions(options) {
    return options;
  }

  /**
   * Builds the request body for the API request.
   *
   * @param {string} model - The model to use for the request.
   * @param {Array<object>} messages - An array of message objects.
   * @param {number} max_tokens - The maximum number of tokens for the response.
   * @param {object} options - Additional options for the API request.
   * @returns {object} The constructed request body.
   */
  buildRequestBody(model, messages, max_tokens, options) {
    const requestBody = {
      model,
      messages,
      max_tokens,
      ...options,
    };
    return requestBody;
  }

  /**
   * Send a message to the API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    // allow for debugLevel
    if (typeof interfaceOptions.debugLevel !== 'undefined') {
      log.setLevel(interfaceOptions.debugLevel);
    }

    // Create the message object if a string is provided, otherwise use the provided object
    let messageObject =
      typeof message === 'string' ? this.createMessageObject(message) : message;

    // Update the message object if needed
    messageObject = this.updateMessageObject(messageObject);

    let { model, messages } = messageObject;

    // support OpenAI structure
    if (isEmptyObject(options)) {
      if (messageObject.model) delete messageObject.model;
      if (messageObject.messages) delete messageObject.messages;

      if (!isEmptyObject(messageObject)) {
        options = messageObject;
      }
    }

    // Finalize the model name
    model =
      model || options.model || this.config[this.interfaceName].model.default;
    if (options.model) delete options.model;

    const selectedModel = getModelByAlias(this.interfaceName, model);

    const { max_tokens = 1024, response_format = '' } = options;

    // Adjust options
    options = this.adjustOptions(options);

    // Build request body
    const requestBody = this.buildRequestBody(
      selectedModel,
      messages,
      max_tokens,
      options,
    );

    if (response_format) {
      requestBody.response_format = { type: response_format };
    }

    // update the url based on the model
    const url = this.getRequestUrl(selectedModel);

    log.log('baseInterface:url', this.baseURL + url);

    // update the headers
    this.updateHeaders(this.client);

    log.log('baseInterface:headers', this.client.defaults.headers);
    log.log('baseInterface:requestBody', requestBody);

    let response;
    let responseContent = null,
      errorResponse = null;

    try {
      if (options.stream !== true) {
        response = await this.client.post(this.baseURL + url, requestBody);
        log.log('baseInterface:response.data', JSON.stringify(response.data));
      } else {
        return await this.client.post(this.baseURL + url, requestBody, {
          responseType: 'stream',
        });
      }
    } catch (error) {
      // attempt error recovery
      /*log.error(
        'baseInterface:error',
        JSON.stringify(error),
        JSON.stringify(response),
      );*/

      responseContent = this.recoverError(error);

      if (!responseContent) {
        // pass up the axios error to the retry handler
        if (error.response) {
          throw {
            response: error.response,
            message: `Could not connect to ${this.baseURL + url} (${
              error.response.status
            })`,
            stack: error.stack,
          };
        } else if (error.request) {
          throw {
            request: error.request,
            message: `Could not connect to ${this.baseURL + url}`,
            stack: error.stack,
          };
        } else {
          throw {
            message: `Could not connect to ${this.baseURL + url}`,
            stack: error.stack,
          };
        }
      } else {
        errorResponse = error.response.data;
      }
    }

    if (response?.data?.choices?.[0]?.message?.content) {
      // openai format
      responseContent = response.data.choices[0].message.content;
    } else if (response?.data?.content?.[0]?.text) {
      // anthropic format
      responseContent = response.data.content[0].text;
    } else if (response?.data?.results?.[0]?.generatedText) {
      // azure ai format
      responseContent = response.data.results[0].generatedText;
    } else if (response?.data?.results?.[0]?.generated_text) {
      // watsonx ai format
      responseContent = response.data.results[0].generated_text;
    } else if (response?.data?.result?.response) {
      // cloudflare workers ai
      responseContent = response.data.result.response;
    } else if (response?.data?.choices?.[0]?.text) {
      // generic text completion
      responseContent = response.data.choices[0].text;
    } else if (response?.data?.answer) {
      // lamina
      responseContent = response.data.answer;
    } else if (response?.data?.responses?.[0]?.message?.content) {
      // reka ai
      responseContent = response.data.responses[0].message.content;
    } else if (response?.data?.message?.content) {
      // ollama
      responseContent = response.data.message.content;
    } else if (response?.data?.[0]?.choices?.[0]?.delta?.content) {
      // corcel
      responseContent = response.data[0].choices[0].delta.content;
    } else if (response?.data?.text) {
      // cohere
      responseContent = response.data.text;
    }

    if (responseContent) {
      responseContent = responseContent.trim();
    }
    //log.log('baseInterface:responseContent', JSON.stringify(responseContent));

    // Attempt to repair the object if needed
    if (
      responseContent &&
      options.response_format === 'json_object' &&
      typeof responseContent === 'string'
    ) {
      try {
        responseContent = JSON.parse(responseContent);
      } catch {
        responseContent = await parseJSON(
          responseContent,
          interfaceOptions.attemptJsonRepair,
        );
      }
    } else if (responseContent && interfaceOptions.attemptJsonRepair) {
      responseContent = await parseJSON(
        responseContent,
        interfaceOptions.attemptJsonRepair,
      );
    }
    //log.log('baseInterface:responseContent(post)', JSON.stringify(responseContent));

    let finalResponse = { success: false, recoveryMode: false };

    if (responseContent) {
      finalResponse.results = responseContent;
      finalResponse.success = true;
    }
    // optionally include the original llm api response
    if (interfaceOptions.includeOriginalResponse) {
      if (response && response?.data) {
        finalResponse.originalResponse = response.data;
      } else if (errorResponse) {
        finalResponse.originalResponse = errorResponse;
        finalResponse.recoveryMode = true;
      }
    }
    log.log('baseInterface:finalResponse', JSON.stringify(finalResponse));
    return finalResponse;
  }

  /**
   * Stream a message to the API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @returns {Promise} The Axios response stream.
   */
  async streamMessage(message, options = {}) {
    if (!this.config[this.interfaceName].stream) {
      throw new StreamError(`${this.interfaceName} does not support streaming`);
    }

    options.stream = true;
    return await this.sendMessage(message, options);
  }

  /**
   * Fetches embeddings for a given prompt using the specified model and options.
   *
   * @async
   * @param {string} prompt - The input prompt to get embeddings for.
   * @param {Object} [options={}] - Optional parameters for embeddings.
   * @param {string} [options.model] - The model to use for embeddings.
   * @param {Object} [interfaceOptions={}] - Interface-specific options.
   * @param {boolean} [interfaceOptions.includeOriginalResponse] - Whether to include the original response in the result.
   *
   * @returns {Promise<Object>} An object containing the embeddings and optionally the original response.
   *
   * @throws {EmbeddingsError} If the interface does not support embeddings or the embedding URL is not found.
   * @throws {RequestError} If the request to fetch embeddings fails.
   */
  async embeddings(prompt, options = {}, interfaceOptions = {}) {
    const embeddingUrl = this.config[this.interfaceName]?.embeddingUrl;

    if (!embeddingUrl) {
      throw new EmbeddingsError(
        '${this.interfaceName} does not support embeddings. Try using a default provider.',
      );
    }

    // get embeddings model
    let model =
      options.model || this.config[this.interfaceName].embeddings.default;

    model = getEmbeddingsModelByAlias(this.interfaceName, model);

    // If we reach here, it means we are either in the original call or we found a valid embedding URL
    if (embeddingUrl) {
      let expects =
        this.config[this.interfaceName]?.embeddings?.expects ||
        this.config[interfaceOptions.embeddingsInterfaceName]?.embeddings
          ?.expects;
      let resultsPath =
        this.config[this.interfaceName]?.embeddings?.results ||
        this.config[interfaceOptions.embeddingsInterfaceName]?.embeddings
          ?.results;
      let payload;

      // Adjust options
      // log.log('expects', expects);
      prompt = this.adjustEmbeddingPrompt(prompt);
      //console.log('prompt', prompt);

      if (expects) {
        // Convert expects to a string for replacements
        let expectsString = JSON.stringify(expects);

        // Replace placeholders with actual values
        expectsString = expectsString.replace(
          '"{embedding}"',
          `${JSON.stringify(prompt)}`,
        );
        expectsString = expectsString.replace('{model}', model);

        if (Array.isArray(config[this.interfaceName].apiKey)) {
          expectsString = expectsString.replace(
            '{second}',
            config[this.interfaceName].apiKey[1],
          );
        }

        // Parse the string back to an object
        payload = JSON.parse(expectsString);
      } else {
        payload = {
          input: prompt,
          model: model,
        };
      }
      const url = this.getEmbedRequestUrl(model);
      // log.log('url', embeddingUrl + url);
      // log.log('api', config[this.interfaceName].apiKey);
      // log.log('payload', payload);
      // log.log('prompt', prompt.length);

      let response, embeddings;

      try {
        try {
          response = await this.client.post(embeddingUrl + url, payload);
          // log.log('response', response.data);
        } catch (error) {
          if (error.response) {
            throw {
              response: error.response,
              message: `Could not connect to ${embeddingUrl + url} (${
                error.response.status
              })`,
              stack: error.stack,
            };
          } else if (error.request) {
            throw {
              request: error.request,
              message: `Could not connect to ${embeddingUrl + url}`,
              stack: error.stack,
            };
          } else {
            throw {
              message: `Could not connect to ${embeddingUrl + url}`,
              stack: error.stack,
            };
          }
        }

        const responseData = response.data;

        if (resultsPath) {
          const pathParts = resultsPath.split('.');

          const initialObject =
            pathParts[0] === 'response' ? response : response.data;
          const validPathParts =
            pathParts[0] === 'response' ? pathParts.slice(1) : pathParts;

          embeddings = validPathParts.reduce((obj, part) => {
            if (obj) {
              // Check for array index in the part
              const arrayIndexMatch = part.match(/^(\w+)\[(\d+)\]$/);
              if (arrayIndexMatch) {
                const [_, key, index] = arrayIndexMatch;
                return obj[key] && obj[key][parseInt(index, 10)];
              }
              return obj[part];
            }
            return undefined;
          }, initialObject);
        } else {
          if (Array.isArray(responseData.data)) {
            embeddings = responseData.data[0]?.embedding; //opanai format
          } else if (responseData.data?.embedding) {
            embeddings = responseData.data.embedding;
          } else {
            // Add more checks as per the API documentation or known response structures
            throw new EmbeddingsError(
              'Unexpected response structure for embedding data',
              responseData.data,
            );
          }
        }

        embeddings = { results: embeddings };

        if (interfaceOptions.includeOriginalResponse) {
          embeddings.originalResponse = responseData;
        }

        return embeddings;
      } catch (error) {
        throw new Error(`Failed to fetch embeddings: ${error.message}`);
      }
    } else {
      // If in fallback and no valid URL was found, throw an error
      throw new EmbeddingsError(
        'Valid embedding URL not found after fallback attempts',
      );
    }
  }

  adjustEmbeddingPrompt(prompt) {
    return prompt;
  }

  recoverError(error) {
    return null;
  }
}

module.exports = BaseInterface;
