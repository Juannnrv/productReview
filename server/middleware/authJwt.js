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
  // Retrieve the authentication token from the session
  const token = req.session.authToken;
  console.log(token);
  // If no token is found, return an error response indicating the session has expired
  if (!token) {
    return res.status(401).json({ status: 401, message: 'Session expired.' });
  }
  
  try {
    // Decode and verify the token using the secret stored in environment variables
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    
    // Attach the decoded user information to the request object for further use in route handlers
    req.user = decoded; 
    // console.log("token:", token);
    console.log("prueba",req.user);
    
    // Proceed to the next middleware or route handler if the token is valid
    next();
  } catch (error) {
    // If the token verification fails, return an error response indicating an invalid token
    return res.status(401).json({ status: 401, message: 'Invalid token.' });
  }
};

module.exports = verifyJwt;
