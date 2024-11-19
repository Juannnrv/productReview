const jwt = require("jsonwebtoken");

/**
 * Middleware to verify the JSON Web Token (JWT) in the user's session.
 * This function checks if the JWT is valid and attaches the decoded user information
 * to the request object (`req.user`). If the token is missing or invalid, an error
 * response is sent to the client with an appropriate message.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The next middleware function to be called if the JWT is valid.
 *
 * @returns {Object} - A JSON response with an error message if the token is missing or invalid.
 */
const verifyJwt = (req, res, next) => {
  const token = req.session.authToken;

  if (!token) {
    return res.status(401).json({ status: 401, message: 'Session expired.' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: 'Invalid token.' });
  }
};

module.exports = verifyJwt;
