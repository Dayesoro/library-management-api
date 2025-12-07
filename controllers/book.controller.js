const bookService = require('../services/book.services');

const { validateBook } = require('../middleware/validation');


// Get all books with pagination
const getAllBooks = (req, res) => {

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const allBooks = bookService.getAllBooks();

  // calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedBooks = allBooks.slice(startIndex, endIndex);

  res.success({
    books: paginatedBooks,
    pagination: {
      page: page,
      limit: limit,
      total: allBooks.length,
      totalPages: Math.ceil(allBooks.length / limit)
    }
  });
};


// Get a single book by ID
const getBookById = (req, res) => {
  const id = parseInt(req.params.id);

  const book = bookService.getBookById(id);

  if (!book) {
    return res.error('Book not found', 404);
  }

  res.success(book);
};


// Create a new book
const createBook = (req, res) => {
  const validation = validateBook(req.body);

  if (!validation.success) {
    return res.error(validation.errors.join(', '), 400);
  }

  const { title, isbn, publishedYear, availableCopies, totalCopies, authorId } = validation.data;

  const newBook = bookService.createBook(title, isbn, publishedYear, availableCopies, totalCopies, authorId);

  if (!newBook) {
    return res.error('Author not found', 404);
  }

  res.success(newBook, 201);
};


// Update an existing book
const updateBook = (req, res) => {
  const id = parseInt(req.params.id);

  const validation = validateBook(req.body);

  if (!validation.success) {
    return res.error(validation.errors.join(', '), 400);
  }

  const { title, isbn, publishedYear, availableCopies, totalCopies, authorId } = validation.data;

  const updatedBook = bookService.updateBook(id, title, isbn, publishedYear, availableCopies, totalCopies, authorId);

  if (!updatedBook) {
    return res.error('Book not found or Author not found', 404);
  }

  res.success(updatedBook);
};



// Delete a book
const deleteBook = (req, res) => {
  const id = parseInt(req.params.id);

  const result = bookService.deleteBook(id);

  // Check if book not found
  if (!result) {
    return res.error('Book not found', 404);
  }

  // Check if delete failed due to business logic
  if (!result.success) {
    return res.error(result.error, 400);
  }

  res.success(result.data);
};


// Search books by title
const searchBooks = (req, res) => {

  const searchTerm = req.query.search;

  if (!searchTerm) {
    return res.error('Search term is required. Use ?search=your_search_term', 400);
  }

  const results = bookService.searchBooks(searchTerm);

  res.success(results);
};


// Get all books by a specific author
const getBooksByAuthor = (req, res) => {
  const authorId = parseInt(req.params.id);

  const books = bookService.getBooksByAuthor(authorId);

  res.success(books);
};


// Get all available books (copies > 0)
const getAvailableBooks = (req, res) => {
  const availableBooks = bookService.getAvailableBooks();

  res.success(availableBooks);
};



module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  getBooksByAuthor,
  getAvailableBooks
};