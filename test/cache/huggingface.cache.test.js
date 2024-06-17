// test/huggingface.cache.test.js

const HuggingFace = require("../../src/huggingface");
const { huggingfaceApiKey } = require("../../config");
const { getFromCache, saveToCache } = require("../../src/cache");
jest.mock("../../src/cache"); // Mock the cache module

describe("HuggingFace Interface with Cache", () => {
  const huggingface = new HuggingFace(huggingfaceApiKey);

  const message = {
    model: "gpt2",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Explain the importance of low latency LLMs." },
    ],
  };

  const options = { max_new_tokens: 50 };
  const inputs = message.messages.map((msg) => msg.content).join(" "); // Ensure consistent spacing
  const cacheKey = JSON.stringify({
    inputs: inputs,
    parameters: { max_new_tokens: 50 },
  });
  const cacheTimeoutSeconds = 86400;
  const mockResponse = [
    { generated_text: "The importance of low latency LLMs is..." },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return cached response if available", async () => {
    getFromCache.mockReturnValue(mockResponse[0].generated_text);

    const response = await huggingface.sendMessage(
      message,
      options,
      cacheTimeoutSeconds
    );

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(mockResponse[0].generated_text);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  it("should save response to cache if not cached", async () => {
    getFromCache.mockReturnValue(null);
    saveToCache.mockImplementation(() => {});

    // Mocking axios post request
    huggingface.client.post = jest
      .fn()
      .mockResolvedValue({ data: mockResponse });

    const response = await huggingface.sendMessage(
      message,
      options,
      cacheTimeoutSeconds
    );

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(huggingface.client.post).toHaveBeenCalledWith("gpt2", {
      inputs: inputs, // Ensure consistent spacing
      parameters: { max_new_tokens: 50 },
    });
    expect(response).toBe(mockResponse[0].generated_text);
    expect(saveToCache).toHaveBeenCalledWith(
      cacheKey,
      mockResponse[0].generated_text,
      cacheTimeoutSeconds
    );
  });

  it("should handle API errors gracefully", async () => {
    getFromCache.mockReturnValue(null);
    huggingface.client.post = jest
      .fn()
      .mockRejectedValue(new Error("API error"));

    await expect(
      huggingface.sendMessage(message, options, cacheTimeoutSeconds)
    ).rejects.toThrow("API error");

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(saveToCache).not.toHaveBeenCalled();
  });
});
