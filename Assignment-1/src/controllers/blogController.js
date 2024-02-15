// Importing the 'fs' module for file system operations and the 'blogs' data from the 'blogs.json' file.
const fs = require("fs");
const blogs = require("../data/blogs.json");

// Handler function to get all blogs
const getAllBlogs = (req, res) => {
  // Respond with the 'blogs' data as JSON
  res.status(200).json(blogs);
};

// Handler function to create a new blog
const createBlog = (req, res) => {
  // Extract data from the request body
  const { authorId, title, content } = req.body;

  // Create a new blog object
  const newBlog = {
    id: blogs.length + 1, // Assign a new ID to the blog
    authorId,
    title,
    content,
  };

  // Add the new blog to the 'blogs' array
  blogs.push(newBlog);

  // Write the updated blog data back to the 'blogs.json' file
  fs.writeFile("./src/data/blogs.json", JSON.stringify(blogs), (err) => {
    // If an error occurs while writing the file
    if (err) {
      // Respond with a 500 status code and an error message
      return res.status(500).json({ error: "Error saving blog data" });
    }
    // If writing the file is successful, respond with a success message and the newly created blog
    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  });
};

// Handler function to get blogs by author ID
const getBlogByAuthorId = (req, res) => {
  // Extract the author ID from the request parameters
  const authorId = parseInt(req.params.authorId);
  // Filter the 'blogs' array to get blogs authored by the specified author
  const authorBlogs = blogs.filter((blog) => blog.authorId === authorId);
  // Respond with the filtered blogs as JSON
  res.status(200).json(authorBlogs);
};

// Export the handler functions to be used in other parts of the application
module.exports = {
  getAllBlogs,
  createBlog,
  getBlogByAuthorId,
};
