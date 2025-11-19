/**
 * Environment-aware logging function.
 * Only logs if REACT_APP_NODE_ENV !== 'production' OR log level is 'debug'.
 */
// PUBLIC_INTERFACE
// eslint-disable-next-line import/no-anonymous-default-export
export default function logger(...args) {
  try {
    const level = process.env.REACT_APP_LOG_LEVEL || "info";
    const env = process.env.REACT_APP_NODE_ENV || "development";
    if (env !== "production" || (level && level.toLowerCase() === "debug")) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  } catch (_err) {
    // Fail silently, safe for prod
  }
}
