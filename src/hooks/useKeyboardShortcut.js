import { useEffect } from "react";

/**
 * useKeyboardShortcut
 * @param {string|string[]} keys - key(s) to listen for (case-insensitive)
 * @param {Function} callback - function to call when key is pressed
 */
export default function useKeyboardShortcut(keys, callback) {
  useEffect(() => {

    const keysArray = Array.isArray(keys) ? keys : [keys];

    const handleKeyDown = (event) => {

      // Check if the user is typing in an input, textarea, or contenteditable element
      const tag = event.target.tagName.toLowerCase();
      const isTyping =
        tag === "input" ||
        tag === "textarea" ||
        event.target.isContentEditable;

      if (isTyping) return; // Skip shortcuts while typing

      if (keysArray.some(k => event.key.toLowerCase() === k.toLowerCase())) {
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keys, callback]);
}