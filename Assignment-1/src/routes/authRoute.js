// Requiring the express module
const express = require("express");

// Creating an instance of Express router
const router = express.Router();

// Requiring the controllers
const { login, register } = require("../controllers/authController");

// Defining routes for login and register endpoints
router.post("/login", login); // Route for user login
router.post("/register", register); // Route for user registration

// Exporting the router
module.exports = router;
