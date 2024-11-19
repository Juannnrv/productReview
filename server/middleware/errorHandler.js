/**
 * Error handling middleware for handling JSON syntax errors.
 * 
 * This middleware captures and processes errors related to invalid JSON in request bodies.
 * It specifically handles `SyntaxError` errors that occur when the JSON in the request body
 * is malformed, which would typically result in a `400 Bad Request` response.
 * 
 * It will:
 * - Log the error message to the console.
 * - Return a `400 Bad Request` status with a user-friendly error message.
 * 
 * Usage:
 * - This middleware should be placed after your body parser middleware to catch errors 
 *   related to malformed JSON bodies.
 * - It is useful for ensuring that users are notified of malformed JSON errors in a 
 *   friendly and descriptive manner.
 * 
 * @param {Error} err - The error object, which should be an instance of `SyntaxError` if 
 *                       the JSON is malformed.
 * @param {Request} req - The incoming HTTP request.
 * @param {Response} res - The outgoing HTTP response.
 * @param {NextFunction} next - The next middleware function to be called.
 * 
 * @returns {Response} - Sends a `400` status response with an error message if the error 
 *                       is a malformed JSON syntax error.
 */
exports.errorHandler = ((err, req, res, next) => {
    // If the error is a SyntaxError caused by malformed JSON
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Clear the console and log the error message for debugging purposes
        console.clear();
        console.log(err.message);

        // Return a user-friendly message for the malformed JSON
        return res.status(400).json({ 
            status: 400, 
            message: 'Oops! There’s an issue with your JSON. Please check it and try again.' 
        });
    }

    // Pass control to the next middleware if the error is not a JSON syntax error
    next();
});
