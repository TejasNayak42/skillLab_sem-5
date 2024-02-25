import { BlogModel } from "../models/Blog.js";

// Controller function to create a new blog
export const createBlog = async (req, res) => {
  try {
    const { author, title, content } = req.body;
    const newBlog = new BlogModel({ author, title, content });
    await newBlog.save();
    res
      .status(201)
      .json({ message: "Blog created successfully", data: newBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to retrieve all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to retrieve a blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a blog by ID
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await BlogModel.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res
      .status(200)
      .json({ message: "Blog deleted successfully", data: deletedBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};