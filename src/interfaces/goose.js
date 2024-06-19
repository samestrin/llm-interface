/**
 * @file goose.js
 * @class Goose
 * @description Wrapper class for the Goose API.
 * @param {string} apiKey - The API key for the Goose API.
 */

const axios = require("axios");
const { getFromCache, saveToCache } = require("../utils/cache");
const { returnMessageObject, returnModelByAlias } = require("../utils/utils");
const { gooseApiKey } = require("../config/config");
const config = require("../config/llm-providers.json");
const log = require("loglevel");

// Goose class for interacting with the Goose API
class Goose {
  /**
   * Constructor for the Goose class.
   * @param {string} apiKey - The API key for the Goose API.
   */
  constructor(apiKey) {
    this.interfaceName = "goose";
    this.apiKey = apiKey || gooseApiKey;
    this.client = axios.create({
      baseURL: config[this.interfaceName].url,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Send a message to the Goose API.
   * @param {string|object} message - The message to send or a message object.
   * @param {object} options - Additional options for the API request.
   * @param {object} interfaceOptions - Options specific to the interface.
   * @returns {string} The response content from the Goose API.
   */
  async sendMessage(message, options = {}, interfaceOptions = {}) {
    const messageObject =
      typeof message === "string" ? returnMessageObject(message) : message;
    const cacheTimeoutSeconds =
      typeof interfaceOptions === "number"
        ? interfaceOptions
        : interfaceOptions.cacheTimeoutSeconds;

    const { messages } = messageObject;
    const { maxTokens = 150 } = options;
    let { model } = messageObject;

    // Get the selected model based on alias or default
    model = returnModelByAlias(this.interfaceName, model);

    // Set the model and default values
    model =
      model || options.model || config[this.interfaceName].model.default.name;

    // Format the prompt by joining message contents
    const formattedPrompt = messages
      .map((message) => message.content)
      .join(" ");

    // Prepare the payload for the API call
    const payload = {
      prompt: formattedPrompt,
      model,
      maxTokens,
      ...options,
    };

    // Generate a cache key based on the payload
    const cacheKey = JSON.stringify(payload);
    if (cacheTimeoutSeconds) {
      const cachedResponse = getFromCache(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    // Set up retry mechanism with exponential backoff
    let retryAttempts = interfaceOptions.retryAttempts || 0;
    let currentRetry = 0;
    while (retryAttempts >= 0) {
      try {
        // Send the request to the Goose API
        const url = `/${model}/completions`;
        const response = await this.client.post(url, payload);
        let responseText = null;
        if (
          response &&
          response.data &&
          response.data.choices &&
          response.data.choices[0] &&
          response.data.choices[0].text
        ) {
          responseText = response.data.choices[0].text.trim();
        }

        if (cacheTimeoutSeconds && responseText) {
          saveToCache(cacheKey, responseText, cacheTimeoutSeconds);
        }

        return responseText;
      } catch (error) {
        retryAttempts--;
        if (retryAttempts < 0) {
          log.error(
            "Response data:",
            error.response ? error.response.data : null
          );
          throw error;
        }

        // Calculate the delay for the next retry attempt
        let retryMultiplier = interfaceOptions.retryMultiplier || 0.3;
        const delay = (currentRetry + 1) * retryMultiplier * 1000;

        await new Promise((resolve) => setTimeout(resolve, delay));
        currentRetry++;
      }
    }
  }
}

module.exports = Goose;
