const { body } = require("express-validator");

const authValidator = {
    createAccount: [
        body("username").notEmpty().isString().withMessage("Username is required"),
        body("email").isEmail().withMessage("Email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password is required"),
    ],
    logIn: [
        body("username").optional().isString().withMessage("Username is required"),
        body("email").optional().isEmail().withMessage("Email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password is required"),
    ],
}

module.exports = authValidator;