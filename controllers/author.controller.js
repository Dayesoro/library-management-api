const authorService = require('../services/author.service');
const { validateAuthor } = require('../middleware/validation');


// Get all authors
const getAllAuthors = (req, res) => {
  const authors = authorService.getAllAuthors();
  res.success(authors);
}

// Get a single author by ID
const getAuthorById = (req, res) => {
  const id = parseInt(req.params.id);

  const author = authorService.getAuthorById(id);

  if (!author) {
    return res.error('Author not found', 404);
  }

  res.success(author);
};

// Create a new author
const createAuthor = (req, res) => {

  const validatedData = validateAuthor(req.body);

  if (!validatedData.success) {
    return res.error(validatedData.errors.join(', '), 400);
  }

  const { name, birthYear, country } = validatedData.data;

  const newAuthor = authorService.createAuthor(name, birthYear, country);

  res.success(newAuthor, 201);
};



// Update an existing author
const updateAuthor = (req, res) => {
  const id = parseInt(req.params.id);

  const validatedData = validateAuthor(req.body);

  if (!validatedData.success) {
    return res.error(validatedData.errors.join(', '), 400);
  }

  const { name, birthYear, country } = validatedData.data;


  const updatedAuthor = authorService.updateAuthor(id, name, birthYear, country);

  if (!updatedAuthor) {
    return res.error('Author not found', 404);
  }

  res.success(updatedAuthor);
};


// Delete an author
const deleteAuthor = (req, res) => {
  const id = parseInt(req.params.id);

  const result = authorService.deleteAuthor(id);

  // Check if author not found
  if (!result) {
    return res.error('Author not found', 404);
  }

  // Check if delete failed due to business logic
  if (!result.success) {
    return res.error(result.error, 400);
  }

  res.success(result.data);
};


module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};