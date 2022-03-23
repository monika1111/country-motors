/**
 * A module for logging events.
 * @module Log
 */

/**
 * Logs success message.
 * @param {string} message
 */
export function success(message: string) {
  console.info(`%c${message}`, "background: green;color: white;padding: 2px");
}

/**
 * Logs error message.
 * @param {string} message
 */
export function error(message: string) {
  console.error(message);
}

/**
 * Logs warning message
 * @param {string} message
 */
export function warning(message: string) {
  console.warn(message);
}

const logObject = { success, error, warning };

export default logObject;
