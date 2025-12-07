# Library API

A RESTful API for managing a simple library system with books, authors, and borrowing records.

## Features

- Manage authors (CRUD operations)
- Manage books with pagination and search
- Track book borrowing and returns
- Identify overdue borrows
- Business logic protection (prevent invalid deletions)
- Request logging and standardized responses
- API key authentication for write operations

## Tech Stack

- Node.js
- Express.js
- Zod (validation)
- In-memory data storage (arrays)

## Project Structure
```
express-api/
├── app.js                      # Main application entry point
├── routes/                     # Route definitions
│   ├── author.route.js
│   ├── book.route.js
│   └── borrow.route.js
├── controllers/                # Request handlers
│   ├── author.controller.js
│   ├── book.controller.js
│   └── borrow.controller.js
├── services/                   # Business logic
│   ├── author.service.js
│   ├── book.services.js
│   ├── borrow.service.js
│   └── data.js                 # In-memory data storage
├── middleware/                 # Custom middleware
│   ├── auth.js                 # API key authentication
│   ├── logger.js               # Request logging
│   ├── responseFormatter.js    # Standardized responses
│   └── validation.js           # Input validation
├── package.json
├── README.md
└── TESTING.md
```

## Installation

1. Clone the repository
```bash
   git clone https://github.com/Dayesoro/library-management-api.git
```
2. Navigate to the project directory:
```bash
   cd library-management-api
```
3. Install dependencies:
```bash
   npm install
```

## Running the Application
```bash
# Development mode (with nodemon)
npm run start:dev

# Production mode
node app.js
```

The server will start on `http://localhost:3008`

## API Key

For endpoints that require authentication, use this API key in the request header:
```
x-api-key: express_app_2025
```

---

## API Endpoints

### Authors Endpoints (5)

#### 1. GET /api/authors
Get all authors.

**Request:**
```bash
curl http://localhost:3008/api/authors
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "J.K. Rowling",
      "birthYear": 1965,
      "country": "United Kingdom"
    },
    ...
  ]
}
```

---

#### 2. GET /api/authors/:id
Get a single author by ID.

**Request:**
```bash
curl http://localhost:3008/api/authors/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "J.K. Rowling",
    "birthYear": 1965,
    "country": "United Kingdom"
  }
}
```

---

#### 3. POST /api/authors
Create a new author. **Requires API key.**

**Request:**
```bash
curl -X POST http://localhost:3008/api/authors \
  -H "Content-Type: application/json" \
  -H "x-api-key: express_app_2025" \
  -d '{
    "name": "Stephen King",
    "birthYear": 1947,
    "country": "United States"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 6,
    "name": "Stephen King",
    "birthYear": 1947,
    "country": "United States"
  }
}
```

---

#### 4. PUT /api/authors/:id
Update an existing author. **Requires API key.**

**Request:**
```bash
curl -X PUT http://localhost:3008/api/authors/5 \
  -H "Content-Type: application/json" \
  -H "x-api-key: express_app_2025" \
  -d '{
    "name": "Dame Agatha Christie",
    "birthYear": 1890,
    "country": "United Kingdom"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Dame Agatha Christie",
    "birthYear": 1890,
    "country": "United Kingdom"
  }
}
```

---

#### 5. DELETE /api/authors/:id
Delete an author. **Requires API key.**  
**Note:** Cannot delete authors with existing books.

**Request:**
```bash
curl -X DELETE http://localhost:3008/api/authors/6 \
  -H "x-api-key: express_app_2025"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 6,
    "name": "Stephen King",
    "birthYear": 1947,
    "country": "United States"
  }
}
```

---

### Books Endpoints (8)

#### 6. GET /api/books
Get all books with pagination.

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 10)

**Request:**
```bash
curl "http://localhost:3008/api/books?page=1&limit=5"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "books": [
      {
        "id": 1,
        "title": "Harry Potter and the Philosopher's Stone",
        "isbn": "9780747532699",
        "publishedYear": 1997,
        "authorId": 1,
        "availableCopies": 3,
        "totalCopies": 5
      },
      ...
    ],
    "pagination": {
      "page": 1,
      "limit": 5,
      "total": 8,
      "totalPages": 2
    }
  }
}
```

---

#### 7. GET /api/books/:id
Get a single book by ID.

**Request:**
```bash
curl http://localhost:3008/api/books/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Harry Potter and the Philosopher's Stone",
    "isbn": "9780747532699",
    "publishedYear": 1997,
    "authorId": 1,
    "availableCopies": 3,
    "totalCopies": 5
  }
}
```

---

#### 8. POST /api/books
Create a new book. **Requires API key.**

**Request:**
```bash
curl -X POST http://localhost:3008/api/books \
  -H "Content-Type: application/json" \
  -H "x-api-key: express_app_2025" \
  -d '{
    "title": "The Shining",
    "isbn": "9780385121675",
    "publishedYear": 1977,
    "availableCopies": 5,
    "totalCopies": 5,
    "authorId": 1
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 9,
    "title": "The Shining",
    "isbn": "9780385121675",
    "publishedYear": 1977,
    "authorId": 1,
    "availableCopies": 5,
    "totalCopies": 5
  }
}
```

---

#### 9. PUT /api/books/:id
Update an existing book. **Requires API key.**

**Request:**
```bash
curl -X PUT http://localhost:3008/api/books/1 \
  -H "Content-Type: application/json" \
  -H "x-api-key: express_app_2025" \
  -d '{
    "title": "Harry Potter and the Sorcerer Stone",
    "isbn": "9780747532699",
    "publishedYear": 1997,
    "availableCopies": 3,
    "totalCopies": 5,
    "authorId": 1
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Harry Potter and the Sorcerer's Stone",
    "isbn": "9780747532699",
    "publishedYear": 1997,
    "authorId": 1,
    "availableCopies": 3,
    "totalCopies": 5
  }
}
```

---

#### 10. DELETE /api/books/:id
Delete a book. **Requires API key.**  
**Note:** Cannot delete books with active (unreturned) borrows.

**Request:**
```bash
curl -X DELETE http://localhost:3008/api/books/8 \
  -H "x-api-key: express_app_2025"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 8,
    "title": "Murder on the Orient Express",
    "isbn": "9780062693662",
    "publishedYear": 1934,
    "availableCopies": 3,
    "totalCopies": 4,
    "authorId": 5
  }
}
```

---

#### 11. GET /api/books/search
Search books by title.

**Query Parameters:**
- `search` (required) - Search term

**Request:**
```bash
curl "http://localhost:3008/api/books/search?search=Harry"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Harry Potter and the Philosopher's Stone",
      ...
    },
    {
      "id": 2,
      "title": "Harry Potter and the Chamber of Secrets",
      ...
    }
  ]
}
```

---

#### 12. GET /api/books/author/:id
Get all books by a specific author.

**Request:**
```bash
curl http://localhost:3008/api/books/author/1
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Harry Potter and the Philosopher's Stone",
      ...
    },
    {
      "id": 2,
      "title": "Harry Potter and the Chamber of Secrets",
      ...
    }
  ]
}
```

---

#### 13. GET /api/books/available
Get all books with available copies (availableCopies > 0).

**Request:**
```bash
curl http://localhost:3008/api/books/available
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Harry Potter and the Philosopher's Stone",
      "availableCopies": 3,
      ...
    },
    ...
  ]
}
```

---

### Borrows Endpoints (5)

#### 14. GET /api/borrows
Get all borrow records.

**Request:**
```bash
curl http://localhost:3008/api/borrows
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "bookId": 2,
      "borrowerName": "Alice Johnson",
      "borrowDate": "2024-11-15T10:00:00.000Z",
      "returnDate": null,
      "status": "borrowed"
    },
    ...
  ]
}
```

---

#### 15. GET /api/borrows/:id
Get a single borrow record by ID.

**Request:**
```bash
curl http://localhost:3008/api/borrows/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "bookId": 2,
    "borrowerName": "Alice Johnson",
    "borrowDate": "2024-11-15T10:00:00.000Z",
    "returnDate": null,
    "status": "borrowed"
  }
}
```

---

#### 16. POST /api/borrows
Create a borrow record (borrow a book).

**Business Rules:**
- Book must exist
- Book must have available copies
- Borrower cannot have an unreturned copy of the same book

**Request:**
```bash
curl -X POST http://localhost:3008/api/borrows \
  -H "Content-Type: application/json" \
  -d '{
    "bookId": 7,
    "borrowerName": "John Doe"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 9,
    "bookId": 7,
    "borrowerName": "John Doe",
    "borrowDate": "2024-12-07T14:30:00.000Z",
    "returnDate": null,
    "status": "borrowed"
  }
}
```

---

#### 17. PUT /api/borrows/:id/return
Return a borrowed book.

**Request:**
```bash
curl -X PUT http://localhost:3008/api/borrows/5/return
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "bookId": 1,
    "borrowerName": "Eve Martinez",
    "borrowDate": "2024-12-01T11:20:00.000Z",
    "returnDate": "2024-12-07T14:35:00.000Z",
    "status": "returned"
  }
}
```

---

#### 18. GET /api/borrows/overdue
Get all overdue borrows (borrowed > 14 days and not returned).

**Request:**
```bash
curl http://localhost:3008/api/borrows/overdue
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "bookId": 2,
      "borrowerName": "Alice Johnson",
      "borrowDate": "2024-11-15T10:00:00.000Z",
      "returnDate": null,
      "status": "borrowed"
    },
    ...
  ]
}
```

---

## Validation Rules

### Author Validation
- `name`: Required, 2-100 characters
- `birthYear`: Required, integer between 1500 and current year
- `country`: Required, minimum 2 characters

### Book Validation
- `title`: Required, 1-200 characters
- `isbn`: Required, exactly 13 digits
- `publishedYear`: Required, integer between 1800 and current year
- `availableCopies`: Required, cannot be negative
- `totalCopies`: Required, must be >= available copies
- `authorId`: Required, must exist in authors array

### Borrow Validation
- `bookId`: Required, must exist in books array
- `borrowerName`: Required, minimum 2 characters
- Cannot borrow if available copies = 0
- Cannot borrow same book twice (same borrower + unreturned)

---

## Business Logic

### Borrowing a Book
1. Checks if book exists
2. Checks if copies are available
3. Decreases available copies by 1
4. Creates borrow record with status 'borrowed'
5. Sets borrow date to current date

### Returning a Book
1. Checks if borrow record exists
2. Checks if already returned
3. Increases available copies by 1
4. Updates borrow record: sets return date and status to 'returned'

### Deleting an Author
- Fails if author has books in the system
- Returns error: "Cannot delete author with existing books"

### Deleting a Book
- Fails if book has unreturned borrows
- Returns error: "Cannot delete book with active borrows"

---

## Error Handling

All errors return a consistent format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors, business logic errors)
- `401` - Unauthorized (invalid API key)
- `404` - Not Found
- `410` - Gone (missing API key)

---

