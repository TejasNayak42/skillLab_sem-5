import { promises as fs } from "fs";
import bcrypt from "bcrypt";
import users from "../data/users.json" assert { type: "json" };
import path from "path";

// Function to get the directory name
const __dirname = path.resolve();

// Login endpoint handler
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Finding the user in the users array
    const user = users.find((user) => user.username === username);
    if (!user) {
      // Return error if user not found
      return res.status(404).json({ error: "User not found" });
    }

    // Comparing password using bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      // Return error if password does not match
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return success message if login successful
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    // Return error if any exception occurs
    res.status(500).json({ error: "Internal server error" });
  }
};

// Register endpoint handler
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hashing the password using bcrypt
    const hash = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      username,
      password: hash,
    };

    // Adding new user to the users array
    users.push(newUser);

    // Constructing the absolute file path for users.json
    const usersFilePath = path.join(__dirname, "data", "users.json");

    // Writing updated user data to file
    await fs.writeFile(usersFilePath, JSON.stringify(users));

    // Return success message if registration successful
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    // Return error if any exception occurs
    console.error("Error writing user data to file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Exporting login and register functions
export { login, register };
