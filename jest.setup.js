// jest.setup.js
require = require('esm')(module /*, options*/);

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

beforeEach(async () => {
  // Add a delay before each test
  await delay(5000); // Adjust the delay time as needed
});
