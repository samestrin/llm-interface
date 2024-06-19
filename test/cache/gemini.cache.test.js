/**
 * @file gemini.cache.test.js
 * @description Tests for the caching mechanism in the Gemini class.
 */

const Gemini = require("../../src/gemini");
const { geminiApiKey } = require("../../src/config/config.js");
const { getFromCache, saveToCache } = require("../../src/cache");
jest.mock("../../src/cache"); // Mock the cache module

describe("Gemini Caching", () => {
  const gemini = new Gemini(geminiApiKey);

  const message = {
    model: "gemini-1.5-flash",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Explain the importance of low latency LLMs." },
    ],
  };

  const options = { max_tokens: 100 };

  // Create the cache key to match the expected internal structure
  const cacheKey = JSON.stringify({
    model: "gemini-1.5-flash",
    history: [
      { role: "user", parts: [{ text: "You are a helpful assistant." }] },
    ],
    prompt: "Explain the importance of low latency LLMs.",
    generationConfig: { maxOutputTokens: 100 },
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Gemini API Key should be set", async () => {
    expect(typeof geminiApiKey).toBe("string");
  });

  test("Gemini API should return cached response if available", async () => {
    const cachedResponse = "Cached response";
    getFromCache.mockReturnValue(cachedResponse);

    const response = await gemini.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test("Gemini API should save response to cache if not cached", async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = "API response";
    const genAI = {
      getGenerativeModel: jest.fn().mockReturnValue({
        startChat: jest.fn().mockReturnValue({
          sendMessage: jest.fn().mockResolvedValue({
            response: { text: jest.fn().mockResolvedValue(apiResponse) },
          }),
        }),
      }),
    };
    gemini.genAI = genAI;

    const response = await gemini.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
