import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
  searchBlogs,
} from "../controllers/blogController.js";
import { verifyToken } from "../middlewares/middleWareJWT.js";

const router = express.Router();

// Create a new blog
router.post("/", createBlog);

// Get all blogs
router.get("/", verifyToken, getAllBlogs);

// Get a blog by ID
router.get("/:id", verifyToken, getBlogById);

// Delete a blog by ID
router.delete("/:id", verifyToken, deleteBlog);

// Search for blogs by title
router.get("/search/:query", verifyToken, searchBlogs);

export { router as blogRouter };
