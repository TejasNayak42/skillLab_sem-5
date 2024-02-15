import express from "express";
import {
  getAllBlogs,
  createBlog,
  getBlogByAuthorId,
} from "../controllers/blogController.js";
import { validateAuthorId } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/", createBlog);
router.get("/:authorId", validateAuthorId, getBlogByAuthorId);

// Export the router
export { router as blogRouter };
