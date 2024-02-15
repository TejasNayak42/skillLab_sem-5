// Importing required modules: 'fs' for file system operations and 'bcrypt' for password hashing
const fs = require("fs");
const bcrypt = require("bcrypt");

// Importing user data from the 'users.json' file
const users = require("../data/users.json");

// Handler function for user login
const login = (req, res) => {
  const { username, password } = req.body;

  // Find the user with the given username
  const user = users.find((user) => user.username === username);
  // If user not found, respond with 404 error
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Compare the provided password with the hashed password stored in the user data
  bcrypt.compare(password, user.password, (err, result) => {
    // If there's an error or passwords don't match, respond with 401 error
    if (err || !result) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // If login is successful, respond with a success message
    res.status(200).json({ message: "Login successful" });
  });
};

// Handler function for user registration
const register = (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists in the user data
  const existingUser = users.find((user) => user.username === username);
  // If username already exists, respond with 400 error
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  // Hash the provided password
  bcrypt.hash(password, 10, (err, hash) => {
    // If there's an error hashing the password, respond with 500 error
    if (err) {
      return res.status(500).json({ error: "Error hashing password" });
    }

    // Create a new user object with hashed password
    const newUser = {
      id: users.length + 1, // Assign a new ID to the user
      username: username,
      password: hash,
    };

    // Add the new user to the users array
    users.push(newUser);

    // Write the updated user data back to the 'users.json' file
    fs.writeFile("./src/data/users.json", JSON.stringify(users), (err) => {
      // If there's an error writing the file, respond with 500 error
      if (err) {
        return res.status(500).json({ error: "Error saving user data" });
      }
      // If registration is successful, respond with a success message
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

// Exporting login and register functions to be used in other parts of the application
module.exports = {
  login,
  register,
};
