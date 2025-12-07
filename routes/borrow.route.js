const express = require('express');
const router = express.Router();

const borrowController = require('../controllers/borrow.controller');


// GET /api/borrows/overdue - Get overdue borrows 
router.get('/overdue', borrowController.getOverdueBorrows);

// GET /api/borrows - Get all borrow records
router.get('/', borrowController.getAllBorrows);

// GET /api/borrows/:id - Get single borrow record
router.get('/:id', borrowController.getBorrowById);

// POST /api/borrows - Create borrow record (borrow a book)
router.post('/', borrowController.createBorrow);

// PUT /api/borrows/:id/return - Return a borrowed book
router.put('/:id/return', borrowController.returnBook);

module.exports = router;