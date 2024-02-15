import { writeFile } from "fs/promises";
import blogs from "../data/blogs.json" assert { type: "json" };

// Handler for getting all blogs
const getAllBlogs = (req, res) => {
  try {
    // Return all blogs
    res.status(200).json(blogs);
  } catch (error) {
    // Return error if any exception occurs
    res.status(500).json({ error: "Internal server error" });
  }
};

// Handler for creating a new blog
const createBlog = async (req, res) => {
  const { authorId, title, content } = req.body;

  try {
    // Creating new blog object
    const newBlog = {
      id: blogs.length + 1,
      authorId,
      title,
      content,
    };

    // Adding new blog to blogs array
    blogs.push(newBlog);

    // Writing updated blog data to file
    await writeFile("../data/blogs.json", JSON.stringify(blogs));

    // Return success message with created blog
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    // Return error if any exception occurs
    res.status(500).json({ error: "Error saving blog data" });
  }
};

// Handler for getting blogs by author ID
const getBlogByAuthorId = (req, res) => {
  const authorId = parseInt(req.params.authorId);

  try {
    // Filtering blogs by author ID
    const authorBlogs = blogs.filter((blog) => blog.authorId === authorId);

    // Return blogs by author ID
    res.status(200).json(authorBlogs);
  } catch (error) {
    // Return error if any exception occurs
    res.status(500).json({ error: "Internal server error" });
  }
};

// Exporting handlers
export { getAllBlogs, createBlog, getBlogByAuthorId };
