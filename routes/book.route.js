const express = require('express');
const router = express.Router();

const bookController = require('../controllers/book.controller');
const auth = require('../middleware/auth');

// GET /api/books/search - Search books by title 
router.get('/search', bookController.searchBooks);

// GET /api/books/available - Get available books 
router.get('/available', bookController.getAvailableBooks);

// GET /api/books/author/:id - Get books by author 
router.get('/author/:id', bookController.getBooksByAuthor);

// GET /api/books - Get all books with pagination
router.get('/', bookController.getAllBooks);

// GET /api/books/:id - Get single book 
router.get('/:id', bookController.getBookById);

// POST /api/books - Create book 
router.post('/', auth, bookController.createBook);

// PUT /api/books/:id - Update book 
router.put('/:id', auth, bookController.updateBook);

// DELETE /api/books/:id - Delete book 
router.delete('/:id', auth, bookController.deleteBook);

module.exports = router;