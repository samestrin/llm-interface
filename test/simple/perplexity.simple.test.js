const Perplexity = require("../../src/interfaces/perplexity");
const { perplexityApiKey } = require("../../src/config/config");

test("Perplexity Labs API Key should be set", () => {
  expect(typeof perplexityApiKey).toBe("string");
});

test("Perplexity Labs API Client should send a message and receive a response", async () => {
  const perplixity = new Perplexity(perplexityApiKey);
  const message = "Explain the importance of low latency LLMs.";
  const response = await perplixity.sendMessage(message, { max_tokens: 100 });

  expect(typeof response).toBe("string");
});
