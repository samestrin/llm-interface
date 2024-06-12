const LlamaCP = require("../src/llamacp"); // Adjust path as needed
const { llamaURL } = require("../config");

test("LlamaCP API Client should send a message and receive a response", async () => {
  expect(typeof llamaURL).toBe("string");

  const llamacp = new LlamaCP(llamaURL);
  const message = {
    model: "some-llamacp-model",
    messages: [
      {
        role: "user",
        content: "Explain the importance of low latency LLMs.",
      },
    ],
  };

  const response = await llamacp.sendMessage(message, { max_tokens: 100 });
  console.log(response);
  expect(typeof response).toBe("string");
}, 30000); // Extend timeout to 30 seconds
