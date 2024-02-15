import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs/promises";

import { authRouter } from "./routes/authRoute.js";
import { blogRouter } from "./routes/blogRoute.js";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);
app.use("/blogs", blogRouter);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Path to the users.json file
const usersFilePath = path.join(__dirname, "data", "users.json");

console.log("__dirname:", __dirname);
// Function to create an empty users.json file if it doesn't exist
const createUsersFileIfNotExists = async () => {
  try {
    await fs.access(usersFilePath);
  } catch (error) {
    // If the file doesn't exist, create it
    if (error.code === "ENOENT") {
      try {
        await fs.writeFile(usersFilePath, "[]"); // Writing an empty JSON array
        console.log("users.json file created successfully");
      } catch (err) {
        console.error("Error creating users.json file:", err);
      }
    } else {
      console.error("Error accessing users.json file:", error);
    }
  }
};

// Call the function to create the file
createUsersFileIfNotExists();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
