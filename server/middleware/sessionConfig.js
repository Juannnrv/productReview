const session = require('express-session');

class SessionService {
  /**
   * Initializes session middleware for the Express application.
   * @param {object} app - The Express application object.
   * 
   * This method configures and enables the use of sessions in the application.
   * It sets up a session store with a secret, cookie configurations, and a maximum
   * session age of 30 minutes. This session configuration is applied to all incoming
   * requests in the Express app.
   */
  static initializeSession(app) {
    app.use(
      session({
        secret: `${process.env.JWT_SECRET}`,  // Secret key for signing the session ID cookie.
        resave: false,  // Prevents resaving the session if it was not modified.
        saveUninitialized: false,  // Prevents saving a session that is not initialized.
        cookie: {
          secure: false,  // Ensures the cookie is sent over HTTPS only.
          httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie.
          maxAge: 30 * 60 * 1000,  // Sets the session cookie to expire in 30 minutes.
          sameSite: 'Lax',  // Allows cross-site cookies for third-party requests.
        },
      })
    );
  }

  /**
   * Sets a session value for a given key.
   * @param {object} req - The Express request object.
   * @param {string} key - The key under which the value is stored.
   * @param {any} value - The value to store in the session.
   * 
   * This method stores a key-value pair in the session for the current user.
   */
  static setSession(req, key, value) {
    req.session[key] = value;
  }

  /**
   * Retrieves a session value for a given key.
   * @param {object} req - The Express request object.
   * @param {string} key - The key for which the value is retrieved.
   * @returns {any} - The value associated with the key in the session.
   * 
   * This method retrieves the stored value for the provided session key.
   * If the key doesn't exist, it returns undefined.
   */
  static getSession(req, key) {
    return req.session[key];
  }

  /**
   * Destroys the current session.
   * @param {object} req - The Express request object.
   * 
   * This method destroys the session, removing all stored data.
   */
  static destroySession(req) {
    req.session.destroy();
  }
}

module.exports = SessionService;
