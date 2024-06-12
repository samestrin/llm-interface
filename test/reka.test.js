const Reka = require("../src/reka"); // Adjust path as needed
const { rekaApiKey } = require("../config");

test("Reka API Client should send a message and receive a response", async () => {
  expect(typeof rekaApiKey).toBe("string");

  const reka = new Reka(rekaApiKey);

  const message = {
    model: "reka-core",
    messages: [
      {
        role: "user",
        content:
          "You are a helpful assistant. Say OK if you understand and stop.",
      },
      {
        role: "system",
        content: "OK",
      },
      {
        role: "user",
        content: "Explain the importance of low latency LLMs.",
      },
    ],
  };
  try {
    const response = await reka.sendMessage(message, {});
    console.log(JSON.stringify(response)); // Log the response for debugging
    expect(typeof response).toBe("string");
  } catch (error) {
    console.error("Test failed:", error); // Log the error for debugging
    throw error;
  }
}, 30000); // Extend timeout to 30 seconds
