// Requiring the express module
const express = require("express");

// Creating an instance of Express router
const router = express.Router();

// Requiring the controllers and middleware
const {
  getAllBlogs,
  createBlog,
  getBlogByAuthorId,
} = require("../controllers/blogController");
const { validateAuthorId } = require("../middleware/authMiddleware");

// Defining routes
router.get("/", getAllBlogs); // Route to get all blogs
router.post("/", createBlog); // Route to create a new blog
router.get("/:authorId", validateAuthorId, getBlogByAuthorId); // Route to get blogs by author ID

// Exporting the router
module.exports = router;
