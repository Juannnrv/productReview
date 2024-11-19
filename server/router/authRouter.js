const express = require('express');
const { createAccount, logIn } = require('../controllers/authController');
const { limit } = require('../middleware/limit');
const { versioning } = require('../middleware/versioning');
const authValidator = require('../validators/authValidator');
const auth = express.Router();

auth.post('/create', limit('post'), versioning('1.0.0'), authValidator.createAccount, createAccount);
auth.post('/login', limit('login'), versioning('1.0.0'), authValidator.logIn, logIn);

module.exports = auth;