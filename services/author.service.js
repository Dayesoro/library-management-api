const { authors, books } = require('./data');

// Helper function to get the next available ID
const getNextId = () => {
  if (authors.length === 0) return 1;
  return Math.max(...authors.map(a => a.id)) + 1;
};

// Get all authors
const getAllAuthors = () => {
  return authors;
};

// Get a single author by ID
const getAuthorById = (id) => {
  const author = authors.find(a => a.id === id);
  return author || null;
}

// Create a new author
const createAuthor = (name, birthYear, country) => {
  const newAuthor = {
    id: getNextId(),
    name: name,
    birthYear: birthYear,
    country: country
  };

  authors.push(newAuthor);
  return newAuthor;
};

// Update an existing author
const updateAuthor = (id, name, birthYear, country) => {
  const index = authors.findIndex(a => a.id === id);

  if (index === -1) {
    return null;
  }

  if (name) {
    authors[index].name = name;
  }

  if (birthYear) {
    authors[index].birthYear = birthYear;
  }

  if (country) {
    authors[index].country = country;
  }

  return authors[index];
};


// Delete an author by ID
const deleteAuthor = (id) => {
  const index = authors.findIndex(a => a.id === id);

  if (index === -1) {
    return null;
  }

  // Check if author has books
  const authorHasBooks = books.some(book => book.authorId === id);

  if (authorHasBooks) {
    return {
      success: false,
      error: 'Cannot delete author with existing books'
    };
  }

  const deletedAuthor = authors.splice(index, 1)[0];
  return { success: true, data: deletedAuthor }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};