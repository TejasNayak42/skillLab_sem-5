// Defining a middleware function to validate author ID
const validateAuthorId = (req, res, next) => {
  const authorId = parseInt(req.params.authorId); // Parsing author ID from request parameters
  // Checking if the parsed author ID is NaN
  if (Number.isNaN(authorId)) {
    // If author ID is not a valid number, send a 400 Bad Request response with an error message
    return res.status(400).json({ error: "Invalid author ID" });
  }
  // If author ID is valid, call the next middleware function
  next();
};

// Exporting the middleware function
module.exports = {
  validateAuthorId,
};
