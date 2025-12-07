const borrowService = require('../services/borrow.service');
const { validateBorrow } = require('../middleware/validation');

// Get all borrow records
const getAllBorrows = (req, res) => {
    const borrows = borrowService.getAllBorrows();
    res.success(borrows);
}

// Get a single borrow record by ID
const getBorrowById = (req, res) => {
    const borrowId = parseInt(req.params.id);

    const borrow = borrowService.getBorrowById(borrowId);

    if (!borrow) {
        return res.error('Borrow record not found', 404);
    }

    res.success(borrow);
};


// Create a borrow record (borrow a book)
const createBorrow = (req, res) => {
    const validation = validateBorrow(req.body);

    if (!validation.success) {
        return res.error(validation.errors.join(', '), 400);
    }

    const { bookId, borrowerName } = validation.data;

    const result = borrowService.createBorrow(bookId, borrowerName);

    if (!result.success) {
        return res.error(result.error, 400);
    }

    res.success(result.data, 201);
};


// Return a borrowed book
const returnBook = (req, res) => {
    const borrowId = parseInt(req.params.id);

    const result = borrowService.returnBook(borrowId);

    if (!result) {
        return res.error('Borrow record not found', 400);
    }

    return res.success(result.data);
}


// Get all overdue borrows (borrowed > 14 days)
const getOverdueBorrows = (req, res) => {
    const overdueBorrows = borrowService.getOverdueBorrows();
    res.success(overdueBorrows);
};

module.exports = {
    getAllBorrows,
    getBorrowById,
    createBorrow,
    returnBook,
    getOverdueBorrows
};



