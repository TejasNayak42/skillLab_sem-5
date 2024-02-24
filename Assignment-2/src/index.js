// Importing the express module
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB using the provided URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

// Define the port for the server, using the provided port or defaulting to 3001
const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
