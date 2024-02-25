import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
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

export { router as blogRouter };
