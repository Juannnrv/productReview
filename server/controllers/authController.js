const Auth = require("../models/authModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const JwtService = require("../middleware/jwtService");

class AuthController {
  static async createAccount(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation errors",
        data: errors.array(),
      });
    }

    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new Auth({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      res.status(201).json({
        status: 201,
        message: "User account created",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error creating user account",
        error: error.message,
      });
    }
  }
  user;
  static async logIn(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation errors",
        data: errors.array(),
      });
    }

    const { username, email, password } = req.body;

    try {
      const user = await Auth.findOne({ $or: [{ email }, { username }] });

      if (!user) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({
          status: 400,
          message: "Invalid password",
        });
      }

      const token = JwtService.generateToken({ _id: user._id });
      req.session.authToken = token;

      res.status(200).json({
        status: 200,
        message: "User logged in",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error logging in user",
        error: error.message,
      });
    }
  }
}

module.exports = AuthController;
