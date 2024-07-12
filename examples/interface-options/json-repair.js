/**
 * @file examples/json/native-json-output.js
 * @description This example demonstrates JSON repair. An invalid JSON response is forced by specifying JSON output requirements through the simplePrompt and requesting a larger result set than can be returned based on token size. The invalid response can be repaired by setting interfaceOptions.attemptJsonRepair to true.
 *
 * Please review /examples/json/json-repair.js for a complete example. The following comment shows a simplified example.
 *
 *    const response = await LLMInterface.sendMessage(
 *      interfaceName
 *      simplePrompt,
 *      {
 *        max_tokens: 100,
 *      },
 *      { attemptJsonRepair: true },
 *    );
 *
 */

require('../json/json-repair.js');
