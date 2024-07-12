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
const EventSource = require('eventsource');
const { delay } = require('../../src/utils/utils.js');

const interfaceSkip = ['ollama']; // having issues testing due to connections being blocked
//const interfaceDelays = ['ollama', 'corcel', 'watsonxai', 'cloudflareai', 'aimlapi'];
const interfaceDelays = []

let aiClient;

afterEach(async () => {
  // break the connection
  try {
    await aiClient.client.get('/', { timeout: 1 });
  } catch { }
});


module.exports = function runTests(
  AIClient,
  apiKey,
  interfaceName,
  model,
  message,
  testStreaming = true,
  testMaxTokens = true,
  delayBetweenTests = 0,
) {
  describe(`${interfaceName} Interface`, () => {
    const delayBetweenTestsWithWait = 30000 + delayBetweenTests * 1000;
    if (apiKey && !interfaceSkip.includes(interfaceName)) {
      let response;
      if (Array.isArray(apiKey)) {
        aiClient = new AIClient(apiKey[0], apiKey[1]);
      } else {
        aiClient = new AIClient(apiKey);
      }
      let allowStreamTestOverride =
        aiClient.config[interfaceName.toLowerCase()].stream || null;

      test('Interface should exist', () => {
        try {
        } catch (error) {
          throw new InitError(
            `Unable to init "${interfaceName}" (${safeStringify(error)})`,
          );
        }

        expect(typeof aiClient === 'object').toBe(true);
      });

      test('API Key should be set', () => {
        expect(typeof apiKey === 'string' || Array.isArray(apiKey)).toBe(true);
      });
      if (true) {
        test(
          'API Client should send a message and receive a response',
          async () => {
            message.model = model;

            try {
              response = await aiClient.sendMessage(
                message,
                { ...options },
                { retryAttempts: 3 },
              );
              if (delayBetweenTests > 0) await delay(delayBetweenTests * 1000);
            } catch (error) {
              console.log(error);
              throw new RequestError(`Request failed: ${safeStringify(error)}`);
            }
            //console.log(response.results);
            expect(typeof response).toStrictEqual('object');
          },
          delayBetweenTestsWithWait,
        );

        if (testMaxTokens) {
          test(`Response should be less than ${expectedMaxLength} characters`, async () => {
            expect(response.results.length).toBeLessThan(expectedMaxLength);
          });
        } else {
          test.skip(`Response should be less than ${expectedMaxLength} characters skipped. This API does not support max_tokens.`, () => { });
        }

        if (testStreaming && allowStreamTestOverride) {
          test('API Client should stream a message and receive a response stream', async () => {

            if (interfaceDelays.includes(interfaceName)) {
              await delay(delayBetweenTests || 5000);
            }
            let streamResponse;
            try {
              streamResponse = await aiClient.streamMessage(message, {
                ...options,
              });

              if (streamResponse.data && streamResponse.data.on) {
                // Node.js stream
                const readableStream = new Readable().wrap(streamResponse.data);
                let data = '';

                await new Promise((resolve, reject) => {
                  readableStream.on('data', (chunk) => {
                    data += chunk;
                  });
                  readableStream.on('close', () => {
                    //console.log('Stream fully closed');
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
                    } finally {
                      if (readableStream) {
                        readableStream.unpipe();
                        readableStream.destroy();
                      }
                    }
                  });

                  readableStream.on('error', (error) => {
                    readableStream.unpipe();
                    readableStream.destroy();
                    reject(
                      new StreamError(`Stream error: ${safeStringify(error)}`),
                    );
                  });
                });
              } else if (
                streamResponse.stream &&
                typeof streamResponse.stream.next === 'function'
              ) {
                // Async iterator
                let data = '';
                let currentTry = 0;
                const maxTries = 100;
                for await (const chunk of streamResponse.stream) {
                  data += chunk;
                  currentTry++;
                  if (currentTry > maxTries) {
                    break;
                  }
                }
                expect(typeof data).toBe('string');
              } else if (
                streamResponse.data &&
                typeof streamResponse.data === 'string' &&
                streamResponse.data.startsWith('http')
              ) {
                // SSE stream
                const eventSource = new EventSource(streamResponse.data);
                let data = '';

                await new Promise((resolve, reject) => {
                  eventSource.onmessage = (event) => {
                    data += event.data;
                  };

                  eventSource.onerror = (error) => {
                    eventSource.close();
                    reject(
                      new StreamError(`Stream error: ${safeStringify(error)}`),
                    );
                  };

                  eventSource.onclose = () => {
                    try {
                      expect(typeof data).toBe('string');
                      resolve();
                    } catch (error) {
                      reject(
                        new StreamError(
                          `Invalid string received: ${safeStringify(error)}`,
                        ),
                      );
                    } finally {
                      eventSource.close();
                    }
                  };
                });
              } else {
                console.warn(
                  'Not a Node.js stream, async iterator, or SSE stream.',
                );
                return;
              }
            } catch (error) {
              console.error('Stream processing error:', error);
              throw new StreamError(
                `Error processing stream: ${safeStringify(error)}`,
              );
            }
            if (interfaceDelays.includes(interfaceName)) {
              await delay(delayBetweenTests || 5000);
            }
          }, 30000);
        } else {
          test.skip(`API Client does not support streaming`, () => { });
        }

      }
    } else {
      test.skip(`API key not set`, () => { });
    }
  });
};
