/**
 * @file utils/timer.js
 * @description Utility functions for processing MoA queries and handling concurrency in the Mixture of Agents (MoA) example.
 */
const { GREEN, YELLOW, RESET } = require('./utils.js');
/**
 * Starts a high-resolution timer.
 * @returns {Array<number>} - The high-resolution real time [seconds, nanoseconds].
 */
function startTimer() {
  return process.hrtime();
}

/**
 * Ends a high-resolution timer and returns the elapsed time.
 * @param {Array<number>} startTime - The start time from process.hrtime().
 * @returns {string} - The formatted elapsed time in seconds or milliseconds.
 */
function endTimer(startTime, title = 'Timer') {
  const diff = process.hrtime(startTime);
  const elapsedTimeMs = (diff[0] * 1e9 + diff[1]) / 1e6; // Convert to milliseconds
  if (elapsedTimeMs >= 1000) {
    const elapsedTimeSec = elapsedTimeMs / 1000; // Convert to seconds
    return [`${title}: ${elapsedTimeSec.toFixed(3)}s`, elapsedTimeSec];
  } else {
    return [`${title}: ${elapsedTimeMs.toFixed(3)}ms`, elapsedTimeMs];
  }
}

/**
 * Compares the speeds of two items and returns a formatted string showing how much faster one is compared to the other.
 * @param {Array} speed1 - An array containing the title and speed of the first item [title, speed].
 * @param {Array} speed2 - An array containing the title and speed of the second item [title, speed].
 * @returns {string} - A formatted string showing the comparison result.
 */
function compareSpeeds(speed1, speed2) {
  const [title1, speedValue1] = speed1;
  const [title2, speedValue2] = speed2;

  if (speedValue1 <= 0 || speedValue2 <= 0) {
    throw new Error('Speed values must be greater than zero.');
  }

  const faster = speedValue1 < speedValue2 ? speed1 : speed2;
  const slower = speedValue1 < speedValue2 ? speed2 : speed1;
  const factor = (slower[1] / faster[1]).toFixed(2);

  return `The ${YELLOW}${faster[0]}${RESET} response was ${GREEN}${factor}${RESET} times faster than ${YELLOW}${slower[0]}${RESET} response.`;
}

module.exports = { startTimer, endTimer, compareSpeeds };
