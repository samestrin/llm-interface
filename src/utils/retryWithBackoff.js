const { SendMessageError, EmbeddingsError } = require('./errors.js');
const { delay } = require('./utils.js');
const { hrtime } = require('process');
const log = require('loglevel');

/**
 * Retries the provided function with exponential backoff and handles specific HTTP errors.
 * @param {Function} fn - The function to retry.
 * @param {object} options - Retry options.
 * @param {number} options.retryAttempts - Number of retry attempts.
 * @param {number} options.retryMultiplier - Multiplier for the retry delay.
 * @param {string} errorType - The type of error to throw ('SendMessageError' or 'EmbeddingsError').
 * @returns {Promise<any>} - The result of the function call.
 * @throws {SendMessageError|EmbeddingsError} - Throws an error if all retry attempts fail or on specific HTTP errors.
 */
async function retryWithBackoff(fn, options, errorType) {
  const start = hrtime();
  let { retryAttempts = 3, retryMultiplier = 0.3 } = options;
  let currentRetry = 0;
  let lastError;
  let statusCode = 0;

  while (retryAttempts > 0) {
    try {
      log.log(`retryWithBackoff: Attempt ${currentRetry + 1}`);
      let response = await fn();
      if (response?.results) {
        const end = hrtime(start);
        const resultsEnd = hrtime(start);

        const milliseconds = end[0] * 1e3 + end[1] / 1e6;
        response.total_time = milliseconds.toFixed(5);

        const resultsMilliseconds = resultsEnd[0] * 1e3 + resultsEnd[1] / 1e6;
        response.request_time = resultsMilliseconds.toFixed(5);

        response.retries = currentRetry;

        return response;
      }
    } catch (error) {
      lastError = error;
      statusCode = error.response?.status;
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
      }
    }
    currentRetry++;
    retryAttempts--;
  }

  // If all retries are exhausted without specific HTTP errors, return the last response with additional info
  if (lastError) {
    const end = hrtime(start);
    const milliseconds = end[0] * 1e3 + end[1] / 1e6;

    const results = {
      total_time: milliseconds.toFixed(5),
      retries: currentRetry,
      success: false,
      error: `HTTP ${statusCode || 'undefined'}: ${
        lastError.response?.statusText ||
        lastError.message ||
        lastError.error_message ||
        lastError.failure_message ||
        lastError.status ||
        'undefined'
      }}`,
    };
    return results; // Return the last error with total_time and retries
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
