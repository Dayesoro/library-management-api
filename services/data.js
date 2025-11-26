// Authors array - stores author information
let authors = [
    {
        id: 1,
        name: 'J.K. Rowling',
        birthYear: 1965,
        country: 'United Kingdom'
    }
];


// Books array - stores book information
// Note: authorId links to an author in the authors array
let books = [
  {
    id: 1,
    title: 'Harry Potter and the Philosopher\'s Stone',
    isbn: '9780747532699',
    publishedYear: 1997,
    authorId: 1,  // This references authors[0]
    availableCopies: 3,
    totalCopies: 5
  }
];

// Borrows array - tracks who borrowed which books
let borrows = [];

module.exports = {
  authors,
  books,
  borrows
};