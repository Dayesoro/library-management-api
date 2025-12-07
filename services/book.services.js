const { books, authors, borrows } = require('./data');

// Helper function to get the next available ID
const getNextId = () => {
  if (books.length === 0) return 1;
  return Math.max(...books.map(b => b.id)) + 1;
};


// Helper function to check if author exists
const authorExists = (authorId) => {
  return authors.some(a => a.id === authorId);
};


// Get all books
const getAllBooks = () => {
  return books;
}

// Get a single book by ID
const getBookById = (id) => {
  const book = books.find(b => b.id === id);
  return book || null;
};

// Create a new book
const createBook = (title, isbn, publishedYear, availableCopies, totalCopies, authorId) => {
  // Check if author exists
  if (!authorExists(authorId)) {
    return null;
  }

  const newBook = {
    id: getNextId(),
    title: title,
    isbn: isbn,
    publishedYear: publishedYear,
    availableCopies: availableCopies,
    totalCopies: totalCopies,
    authorId: authorId
  };

  books.push(newBook);
  return newBook;
};

// Update an existing book
const updateBook = (id, title, isbn, publishedYear, availableCopies, totalCopies, authorId) => {
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return null; // Book not found
  }

  // If authorId is being updated, check if new author exists
  if (authorId && !authorExists(authorId)) {
    return null;
  }

  if (title) {
    books[index].title = title;
  }

  if (isbn) {
    books[index].isbn = isbn;
  }

  if (publishedYear) {
    books[index].publishedYear = publishedYear;
  }

  if (availableCopies !== undefined) {
    books[index].availableCopies = availableCopies;
  }

  if (totalCopies !== undefined) {
    books[index].totalCopies = totalCopies;
  }

  if (authorId) {
    books[index].authorId = authorId;
  }

  return books[index];
};


// Delete a book by ID
const deleteBook = (id) => {
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return null;
  }

  // Check if book has active borrows (unreturned)
  const hasActiveBorrows = borrows.some(
    borrow => borrow.bookId === id && borrow.status === 'borrowed'
  );

  if (hasActiveBorrows) {
    return {
      success: false,
      error: 'Cannot delete book with active borrows'
    };
  }

  const deletedBook = books.splice(index, 1)[0];
  return { success: true, data: deletedBook };
};


// Search books by title
const searchBooks = (searchTerm) => {

  const term = searchTerm.toLowerCase();

  return books.filter(book =>
    book.title.toLowerCase().includes(term)
  );
};

// Get all books by a specific author
const getBooksByAuthor = (authorId) => {
  return books.filter(book => book.authorId === authorId);
};

// Get all available books (copies > 0)
const getAvailableBooks = () => {
  return books.filter(book => book.availableCopies > 0);
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