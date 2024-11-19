const semver = require("semver");

/**
 * Middleware function for versioning control.
 * This middleware checks the version passed in the `x-version` header and compares it with the 
 * specified version of the application. If the version matches, the request is allowed to proceed.
 * If the version doesn't match, the request is passed to the next route.
 * 
 * @param {string} version - The version of the API that the request must match.
 * @returns {function} Express middleware function.
 * 
 * @example
 * // Usage in an Express app:
 * app.use(versioning('1.0.0')); // Only allow version 1.0.0 requests
 */
exports.versioning = (version) => {
  return (req, res, next) => {
    // Check if the version header 'x-version' is present
    if (req.headers["x-version"]) {
      // If the version matches the required version, proceed to the next middleware
      if (semver.eq(req.headers["x-version"], version)) {
        next();
      } else {
        // If the version doesn't match, skip to the next route
        return next("route");
      }
    } else {
      // If the version header is not present, skip to the next route
      return next("route");
    }
  };
};
