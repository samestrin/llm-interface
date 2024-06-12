const RekaWrapper = require("../src/reka"); // Adjust path as needed
const { rekaApiKey } = require("../config");

test("Reka API Client should send a message and receive a response", async () => {
  expect(typeof rekaApiKey).toBe("string");

  const reka = new RekaWrapper(rekaApiKey);

  const message = {
    model: "reka-core",
    messages: [
      {
        role: "user",
        content: "What is the fifth prime number?",
      },
    ],
  };
  try {
    const response = await reka.sendMessage(message, {});
    console.log(response); // Log the response for debugging
    expect(typeof response).toBe("string");
  } catch (error) {
    console.error("Test failed:", error); // Log the error for debugging
    throw error;
  }
}, 30000); // Extend timeout to 30 seconds
