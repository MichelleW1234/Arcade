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
      if (keysArray.some(k => event.key.toLowerCase() === k.toLowerCase())) {
        callback(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keys, callback]);
}