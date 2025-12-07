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
  },
  {
    id: 5,
    name: 'Agatha Christie',
    birthYear: 1890,
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
  },
  {
    id: 8,
    title: 'Murder on the Orient Express',
    isbn: '9780062693662',
    publishedYear: 1934,
    authorId: 5,
    availableCopies: 3,
    totalCopies: 4
  }
];

// Borrows array - tracks who borrowed which books
let borrows = [
  {
    id: 1,
    bookId: 2,
    borrowerName: 'Alice Johnson',
    borrowDate: '2024-11-15T10:00:00.000Z', // 22 days ago - OVERDUE
    returnDate: null,
    status: 'borrowed'
  },
  {
    id: 2,
    bookId: 2,
    borrowerName: 'Bob Smith',
    borrowDate: '2024-11-20T14:30:00.000Z', // 17 days ago - OVERDUE
    returnDate: null,
    status: 'borrowed'
  },
  {
    id: 3,
    bookId: 6,
    borrowerName: 'Charlie Brown',
    borrowDate: '2024-11-10T09:00:00.000Z', // 27 days ago - OVERDUE
    returnDate: null,
    status: 'borrowed'
  },
  {
    id: 4,
    bookId: 6,
    borrowerName: 'Diana Prince',
    borrowDate: '2024-11-18T16:45:00.000Z', // 19 days ago - OVERDUE
    returnDate: null,
    status: 'borrowed'
  },
  {
    id: 5,
    bookId: 1,
    borrowerName: 'Eve Martinez',
    borrowDate: '2024-12-01T11:20:00.000Z', // 6 days ago - NOT overdue
    returnDate: null,
    status: 'borrowed'
  },
  {
    id: 6,
    bookId: 3,
    borrowerName: 'Frank Miller',
    borrowDate: '2024-12-03T13:15:00.000Z', // 4 days ago - NOT overdue
    returnDate: null,
    status: 'borrowed'
  },
  {
    id: 7,
    bookId: 4,
    borrowerName: 'Grace Lee',
    borrowDate: '2024-11-05T08:30:00.000Z', // 32 days ago - but RETURNED
    returnDate: '2024-11-19T10:00:00.000Z',
    status: 'returned'
  },
  {
    id: 8,
    bookId: 5,
    borrowerName: 'Henry Wilson',
    borrowDate: '2024-10-20T15:00:00.000Z', // 48 days ago - but RETURNED
    returnDate: '2024-11-10T09:30:00.000Z',
    status: 'returned'
  }

];

module.exports = {
  authors,
  books,
  borrows
};