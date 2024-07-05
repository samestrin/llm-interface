/**
 * @file test/interfaces/sharedTestCases.js
 * @description Shared test cases for different AI interfaces.
 */

const { options, expectedMaxLength } = require('../../src/utils/defaults.js');
const {
  InitError,
  RequestError,
  StreamError,
} = require('../../src/utils/errors.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
const { Readable } = require('stream');

function delay(ms) {
  ms = ms * 1000;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = function runTests(
  AIClient,
  apiKey,
  clientName,
  model,
  message,
  testStreaming = true,
  testMaxTokens = true,
  delayBetweenTests = 0,
) {
  describe(`${clientName} Interface`, () => {
    let delayBetweenTestsWithWait = 30000 + delayBetweenTests * 1000;
    if (apiKey) {
      let response, aiClient;

      test('API Key should be set', () => {
        expect(typeof apiKey === 'string' || Array.isArray(apiKey)).toBe(true);
      });

      test(
        'API Client should send a message and receive a response',
        async () => {
          try {
            if (Array.isArray(apiKey)) {
              aiClient = new AIClient(apiKey[0], apiKey[1]);
            } else {
              aiClient = new AIClient(apiKey);
            }
          } catch (error) {
            throw new InitError(
              `Unable to init "${clientName}" (${safeStringify(error)})`,
            );
          }
          message.model = model;

          try {
            response = await aiClient.sendMessage(
              message,
              { ...options },
              { retryAttempts: 3 },
            );
            if (delayBetweenTests > 0) await delay(delayBetweenTests);
          } catch (error) {
            console.log(error);
            throw new RequestError(`Request failed: ${safeStringify(error)}`);
          }
          expect(typeof response).toStrictEqual('object');
        },
        delayBetweenTestsWithWait,
      );

      if (testStreaming) {
        test(
          'API Client should stream a message and receive a response stream',
          async () => {
            try {
              if (Array.isArray(apiKey)) {
                aiClient = new AIClient(apiKey[0], apiKey[1]);
              } else {
                aiClient = new AIClient(apiKey);
              }
            } catch (error) {
              throw new InitError(
                `Unable to init "${clientName}" (${safeStringify(error)})`,
              );
            }
            message.model = model;

            try {
              const stream = await aiClient.streamMessage(message, {
                ...options,
              });
              expect(stream).toBeDefined();
              expect(stream).toHaveProperty('data');

              let data = '';
              const readableStream = new Readable().wrap(stream.data);

              await new Promise((resolve, reject) => {
                readableStream.on('data', (chunk) => {
                  data += chunk;
                });

                readableStream.on('end', () => {
                  try {
                    expect(typeof data).toBe('string');
                    resolve();
                  } catch (error) {
                    reject(
                      new StreamError(
                        `Invalid string received: ${safeStringify(error)}`,
                      ),
                    );
                  }
                });

                readableStream.on('error', (error) => {
                  reject(
                    new StreamError(`Stream error: ${safeStringify(error)}`),
                  );
                });
              });
              if (delayBetweenTests > 0) await delay(delayBetweenTests);
            } catch (error) {
              throw new StreamError(
                `Stream test failed: ${safeStringify(error)}`,
              );
            }
          },
          delayBetweenTestsWithWait,
        );
      } else {
        test.skip(`API Client should stream a message and receive a response stream skipped. This API does not support streaming.`, () => {});
      }

      if (testMaxTokens) {
        test(`Response should be less than ${expectedMaxLength} characters`, async () => {
          expect(response.results.length).toBeLessThan(expectedMaxLength);
          if (delayBetweenTests > 0) await delay(delayBetweenTests);
        });
      } else {
        test.skip(`Response should be less than ${expectedMaxLength} characters skipped. This API does not support max_tokens.`, () => {});
      }
    } else {
      test.skip(`API Key is not set`, () => {});
    }
  });
};
