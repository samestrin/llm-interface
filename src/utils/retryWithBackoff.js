const { SendMessageError, EmbeddingsError } = require('./errors.js');
const { delay } = require('./utils.js');
const log = require('loglevel');
log.setLevel(log.levels.SILENT);

/**
 * Retries the provided function with exponential backoff and handles specific HTTP errors.
 * @param {Function} fn - The function to retry.
 * @param {object} options - Retry options.
 * @param {number} options.retryAttempts - Number of retry attempts.
 * @param {number} options.retryMultiplier - Multiplier for the retry delay.
 * @param {string} errorType - The type of error to throw ('SendMessageError' or 'EmbeddingsError').
 * @returns {Promise<any>} - The result of the function call.
 * @throws {SendMessageError|EmbeddingsError} - Throws an error if all retry attempts fail.
 */
async function retryWithBackoff(fn, options, errorType) {
  let { retryAttempts = 3, retryMultiplier = 0.3 } = options;
  let currentRetry = 0;

  while (retryAttempts > 0) {
    try {
      log.log(`retryWithBackoff:${retryAttempts}`);
      let response = await fn();
      if (response?.results) {
        return response;
      }
    } catch (error) {
      const statusCode = error.response?.status;
      const delayTime = (currentRetry + 1) * retryMultiplier * 1000 + 500;

      switch (statusCode) {
        case 400:
        case 401:
        case 403:
        case 404:
          log.log(
            `retryWithBackoff:error:${statusCode}:${
              error.response?.statusText || 'Error'
            }`,
          );

          throw createError(errorType, statusCode, error);
          break;

        case 429:
        case 503:
          // Retry after the specified time in the Retry-After header if present
          const retryAfter = error.response?.headers['retry-after'];

          if (retryAfter) {
            log.log(
              `retryWithBackoff:error:${statusCode}: Retry after ${retryAfter} s`,
            );
            await delay(retryAfter * 1000);
          } else {
            await delay(delayTime);
          }
          break;

        case 500:
        case 502:
        case 504:
          // Retry with exponential backoff
          await delay(delayTime);
          break;

        default:
          throw createError(errorType, statusCode || 'Unknown', error);
          break;
      }
    }
    currentRetry++;
    retryAttempts--;
  }

  if (errorType === 'SendMessageError') {
    throw new SendMessageError('All retry attempts failed');
  } else if (errorType === 'EmbeddingsError') {
    throw new EmbeddingsError('All retry attempts failed');
  }
}

/**
 * Creates a custom error based on the provided type, status code, and error details.
 * @param {string} type - The type of error to create ('SendMessageError' or 'EmbeddingsError').
 * @param {number|string} statusCode - The HTTP status code associated with the error.
 * @param {Error} error - The original error object containing additional details.
 * @returns {SendMessageError|EmbeddingsError} - The custom error object.
 * @throws {Error} - Throws a generic error if the provided type is not recognized.
 */
function createError(type, statusCode, error) {
  const message = `HTTP ${statusCode}: ${
    error.response?.statusText || error.message
  }`;
  const data = error.response?.data;
  const stack = error.stack;

  if (type === 'SendMessageError') {
    return new SendMessageError(message, data, stack);
  } else if (type === 'EmbeddingsError') {
    return new EmbeddingsError(message, data, stack);
  }
  throw new Error(`Unknown error type: ${type}`);
}

module.exports = { retryWithBackoff };
