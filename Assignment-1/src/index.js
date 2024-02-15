// Importing the express module
const express = require("express");

// Creating an express application instance
const app = express();

// Importing the routes
const authRoutes = require("../src/routes/authRoute");
const blogRoutes = require("../src/routes/blogRoute");

// Middleware to parse JSON requests
app.use(express.json());

// Using the routes
app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

// Sample route for testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Defining the port number
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
