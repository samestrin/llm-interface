/**
 * @file src/interfaces/replicate.js
 * @class Replicate
 * @description Wrapper class for the Replicate API.
 * @param {string} apiKey - The API key for Replicate API.
 */

const BaseInterface = require('./baseInterface.js');
const { delay } = require('../utils/utils.js');
const { getModelByAlias } = require('../utils/config.js');
const { replicateOpenAIApiKey } = require('../utils/loadApiKeysFromEnv.js');
const { GetPredictionError } = require('../utils/errors.js');
const { getConfig, loadProviderConfig } = require('../utils/configManager.js');

const interfaceName = 'replicate';

loadProviderConfig(interfaceName);
const config = getConfig();

// Replicate class for interacting with the Replicate API
class Replicate extends BaseInterface {
  /**
   * Constructor for the Replicate class.
   * @param {string} apiKey - The API key for the Replicate API.
   */
  constructor(apiKey) {
    super(
      interfaceName,
      apiKey || replicateOpenAIApiKey,
      config[interfaceName].url,
    );
    this.predictionResults = [];
  }

  /**
   * Send a message to the Replicate API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface, including streaming and response format options.
   * @returns {Promise<string|Stream>} The response content from the Replicate API, or a response stream if streaming is enabled.
   * @throws {SendMessageError} If the request fails.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    // Extract model and messages from the message object
    let { model } = message;

    // Set the model and default values
    model = model || options.model || config[this.interfaceName].model.default;
    if (options.model) delete options.model;

    // Get the selected model based on alias or default
    const selectedModel = getModelByAlias(this.interfaceName, model);

    // Set default values for temperature, max_tokens, and stop_sequences
    const { max_tokens = 150 } = options;

    // Format the prompt based on the input type
    let prompt;
    if (typeof message === 'string') {
      prompt = message;
    } else {
      // Join message contents to format the prompt
      prompt = message.messages.map((message) => message.content).join(' ');
    }

    if (options.max_tokens) delete options.max_tokens;
    // Prepare the request body for the API call
    const requestBody = {
      input: {
        prompt,
        max_new_tokens: max_tokens,
        ...options,
      },
    };

    // Send the request to the Replicate API
    const response = await this.client.post(
      `${this.baseURL}/${selectedModel}/predictions`,
      requestBody,
    );

    // beta streaming support
    if (options?.stream && response?.data?.urls?.get) {
      return await this.client.get(response.data.urls.get, {
        responseType: 'stream',
      });
    }

    // Extract the response content from the API response
    let responseContent = null;
    if (response?.data?.urls?.get) {
      responseContent = await this.getPredictionData(
        response.data.urls.get,
        interfaceOptions,
      );
    }

    // Merge results array
    responseContent = responseContent.join('');

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

    if (responseContent) {
      // Build response object
      responseContent = { results: responseContent };

      // optionally include the original llm api response
      if (interfaceOptions.includeOriginalResponse) {
        responseContent.originalResponse = response.data;
      }

      // Return the response content
      return responseContent;
    }
  }

  /**
   * Get prediction data from a URL with progressive retry logic.
   * @param {string} url - The URL to fetch the prediction data from.
   * @param {object} interfaceOptions - Options specific to the interface, including retry settings.
   * @param {number} [maxAttempts=10] - The maximum number of attempts.
   * @param {number} [baseDelay=250] - The base delay in milliseconds used for the progressive retry.
   * @returns {Promise<object>} The prediction data.
   * @throws {GetPredictionError} If the prediction retrieval fails after the maximum number of attempts.
   */
  async getPredictionData(
    url,
    interfaceOptions,
    maxAttempts = 10,
    baseDelay = 250,
  ) {
    let attempt = 0;
    const uniqueId = Math.random().toString(36).substr(2, 9); // Generate a unique ID for each call

    while (attempt < maxAttempts) {
      try {
        this.predictionResults[url] = await this.client.get(url);
        const status = this.predictionResults[url].data.status;

        if (status === 'succeeded') {
          return this.predictionResults[url].data.output;
        } else if (status === 'failed' || status === 'canceled') {
          return false;
        } else if (status === 'starting' || status === 'processing') {
          // Calculate the progressive delay
          let retryMultiplier = interfaceOptions.retryMultiplier || 0.3;
          const delayTime = (attempt + 1) * retryMultiplier * 1000 + baseDelay;
          await delay(delayTime);
          attempt++;
        }
      } catch (error) {
        throw new GetPredictionError(
          `Failed to get prediction: ${error.response ? error.response.data : error.message
          }`,
        );
      }
    }

    console.log(`ID ${uniqueId} - Max attempts reached without success`);
    return false;
  }
}

module.exports = Replicate;
