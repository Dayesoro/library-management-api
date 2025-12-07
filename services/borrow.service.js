const { borrows, books } = require('./data');

// Helper function to get the next available ID
const getNextId = () => {
    if (borrows.length === 0) return 1;
    return Math.max(...borrows.map(b => b.id)) + 1;
};


// Get all borrow records
const getAllBorrows = () => {
    return borrows;
};

// Get a single borrow record by ID
const getBorrowById = (id) => {
    const borrow = borrows.find(b => b.id === id);
    return borrow || null;
};

// Create a new borrow record (borrow a book)
const createBorrow = (bookId, borrowerName) => {
    const book = books.find(b => b.id === bookId);

    // checks if book exists
    if (!book) {
        return { success: false, error: 'Book not found' };
    }

    // checks if copies are available
    if (book.availableCopies <= 0) {
        return { success: false, error: 'No copies available' };
    }

    // Check if borrower already has an unreturned copy of this book
    const existingBorrow = borrows.find(
        b => b.bookId === bookId &&
            b.borrowerName === borrowerName &&
            b.status === 'borrowed'
    );

    if (existingBorrow) {
        return { success: false, error: 'Borrower already has an unreturned copy of this book' };
    }


    // Decrease available copies
    book.availableCopies -= 1;

    // create borrow record
    const newBorrow = {
        id: getNextId(),
        bookId: bookId,
        borrowerName: borrowerName,
        borrowDate: new Date().toISOString(),
        returnDate: null,
        status: 'borrowed'
    };

    borrows.push(newBorrow);
    return { success: true, data: newBorrow };
}


// Return a borrowed book
const returnBook = (borrowId) => {

    const borrow = borrows.find(b => b.id === borrowId);

    if (!borrow) {
        return { success: false, error: 'Borrow record not found' };
    }

    // Check if book is already returned
    if (borrow.status === 'returned') {
        return { success: false, error: 'Book already returned' };
    }

    // Find the book and increase available copies
    const book = books.find(b => b.id === borrow.bookId);

    if (!book) {
        return { success: false, error: 'Book not found' };
    }

    book.availableCopies += 1;

    // Update the borrow record
    borrow.returnDate = new Date().toISOString();
    borrow.status = 'returned';

    return { success: true, data: borrow };
};


// Get all overdue borrows (borrowed > 14 days and not returned)
const getOverdueBorrows = () => {
    // Calculate what date was 14 days ago
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    // Filter borrows to find overdue ones
    const overdueBorrows = borrows.filter(borrow => {

        if (borrow.status === 'returned') {
            return false;
        }

        const whenBookWasBorrowed = new Date(borrow.borrowDate);

        const isOverdue = whenBookWasBorrowed < fourteenDaysAgo;

        return isOverdue;
    });

    return overdueBorrows;
};


module.exports = {
    getAllBorrows,
    getBorrowById,
    createBorrow,
    returnBook,
    getOverdueBorrows
};