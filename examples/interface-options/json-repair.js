/*
 * @file examples/interfaceOptions/json-repair.js
 * @description Example showing interfaceOptions usage to control the JSON repair function. When enabled any invalid JSON responses will attempt to be repaired.
 *
 * Please review /examples/json/json-repair.js for a complete example. The following comment shows a simplified example.
 *
 *    const response = await LLMInterface.sendMessage(
 *      interface,
 *      prompt,
 *      {
 *        max_tokens: 100,
 *      },
 *      { attemptJsonRepair: true },
 *    );
 *
 */

require('../json/json-repair.js');
