/**
 * @file utils/markdown.js
 * @description Utility functions for coloring an removing markdown in the Mixture of Agents (MoA) example.
 */

const removeMarkdown = require('markdown-to-text');
const { GREEN, YELLOW, RESET } = require('../../../src/utils/utils.js');
const BRIGHT_YELLOW = '\x1b[93m';
function removeMarkdownColor(markdown) {
  if (markdown) {
    // Replace headers and bold text with styled text
    markdown = markdown
      .replace(/^# (.+)$/gm, `${GREEN}$1${RESET}`)
      .replace(/^## (.+)$/gm, `${GREEN}$1${RESET}`)
      .replace(/^### (.+)$/gm, `${GREEN}$1${RESET}`)
      .replace(/^#### (.+)$/gm, `${YELLOW}$1${RESET}`)
      .replace(/\*\*\*(.+)\*\*\*/g, `${BRIGHT_YELLOW}$1${RESET}`)
      .replace(/\*\*(.+)\*\*/g, `${YELLOW}$1${RESET}`)
      .replace(/\*(.+)\*/g, `$1`);

    // strip remaining markdown
    return removeMarkdown.default(markdown);
  } else {
    return false;
  }
}
module.exports = {
  removeMarkdownColor,
};
