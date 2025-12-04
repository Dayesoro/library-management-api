// Authors array - stores author information
let authors = [
  {
    id: 1,
    name: 'J.K. Rowling',
    birthYear: 1965,
    country: 'United Kingdom'
  },
  {
    id: 2,
    name: 'George R.R. Martin',
    birthYear: 1948,
    country: 'United States'
  },
  {
    id: 3,
    name: 'Chimamanda Ngozi Adichie',
    birthYear: 1977,
    country: 'Nigeria'
  },
  {
    id: 4,
    name: 'Haruki Murakami',
    birthYear: 1949,
    country: 'Japan'
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
    authorId: 1,
    availableCopies: 3,
    totalCopies: 5
  },
  {
    id: 2,
    title: 'Harry Potter and the Chamber of Secrets',
    isbn: '9780747538493',
    publishedYear: 1998,
    authorId: 1,
    availableCopies: 0,
    totalCopies: 3
  },
  {
    id: 3,
    title: 'A Game of Thrones',
    isbn: '9780553103540',
    publishedYear: 1996,
    authorId: 2,
    availableCopies: 2,
    totalCopies: 4
  },
  {
    id: 4,
    title: 'A Clash of Kings',
    isbn: '9780553108033',
    publishedYear: 1998,
    authorId: 2,
    availableCopies: 1,
    totalCopies: 3
  },
  {
    id: 5,
    title: 'Half of a Yellow Sun',
    isbn: '9780007200283',
    publishedYear: 2006,
    authorId: 3,
    availableCopies: 4,
    totalCopies: 5
  },
  {
    id: 6,
    title: 'Norwegian Wood',
    isbn: '9780375704024',
    publishedYear: 1987,
    authorId: 4,
    availableCopies: 0,
    totalCopies: 2
  },
  {
    id: 7,
    title: 'Kafka on the Shore',
    isbn: '9781400079278',
    publishedYear: 2002,
    authorId: 4,
    availableCopies: 2,
    totalCopies: 3
  }
];

// Borrows array - tracks who borrowed which books
let borrows = [];

module.exports = {
  authors,
  books,
  borrows
};