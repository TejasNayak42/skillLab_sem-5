import mongoose from "mongoose";

// Define a MongoDB schema for user data
const BlogSchema = new mongoose.Schema(
  {
    // Name of the user
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the drivers collection, assuming you have a drivers model
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    content: {
      type: String,
      required: [true, "Please fill the content"],
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' timestamps
    timestamps: true,
  }
);

// Create a User model based on the schema
export const BlogModel = mongoose.model("blogs", BlogSchema);
