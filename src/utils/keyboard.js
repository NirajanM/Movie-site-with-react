/**
 * True when the user is typing in a form field. Keyboard shortcuts use this
 * to avoid hijacking normal typing (for example "/" while writing a search).
 */
const TYPING_TAGS = ["INPUT", "TEXTAREA", "SELECT"];

export const isTypingTarget = () =>
  TYPING_TAGS.includes(document.activeElement?.tagName);
