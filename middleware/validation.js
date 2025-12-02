const { z } = require('zod');

const currentYear = new Date().getFullYear();

// Author schema
const AuthorSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name cannot be more than 100 characters'),
    birthYear: z.number()
        .int('Birth Year must be an integer')
        .min(1500, 'Birth year must be between 1500 and current year')
        .max(currentYear, `Birth year must be between 1500 and ${currentYear}`),
    country: z.string()
        .min(2, 'Country must be at least 2 characters')
});

// Book schema
const bookSchema = z.object({
  title: z.string()
    .min(1, 'Title must be at least 1 character')
    .max(200, 'Title must be at most 200 characters'),
  isbn: z.string()
    .regex(/^\d{13}$/, 'ISBN must be exactly 13 digits'),
  publishedYear: z.number()
    .int('Published year must be an integer')
    .min(1800, 'Published year must be between 1800 and current year')
    .max(currentYear, `Published year must be between 1800 and ${currentYear}`),
  availableCopies: z.number()
    .int('Available copies must be an integer')
    .min(0, 'Available copies cannot be negative'),
  totalCopies: z.number()
    .int('Total copies must be an integer')
    .min(0, 'Total copies cannot be negative'),
  authorId: z.number()
    .int('Author ID must be an integer')
});


// Borrow schema
const borrowSchema = z.object({
  bookId: z.number()
    .int('Book ID must be an integer'),
  borrowerName: z.string()
    .min(2, 'Borrower name must be at least 2 characters')
});


// Helper function that helps to validate author using AuthorSchema
const validateAuthor = (data) => {
    const result = AuthorSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.issues.map((err) => err.message);
        return {
            success: false,
            errors,
            data: null
        };
    }

    return {
        success: true,
        errors: [],
        data: result.data
    };

};


// Helper function that helps validate book using BookSchema
const validateBook = (data) => {
    const result = bookSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.issues.map((err) => err.message);
        return {
            success: false,
            errors,
            data: null
        };
    }

    return {
        success: true,
        errors: [],
        data: result.data
    };

};


// Helper function that helps validate borrow using borrowSchema
const validateBorrow = (data) => {
    const result = borrowSchema.safeParse(data);

    if (!result.success) {
        const errors = result.error.issues.map((err) => err.message);
        return {
            success: false,
            errors,
            data: null
        };
    }

    return {
        success: true,
        errors: [],
        data: result.data
    };

};



module.exports = {
  AuthorSchema,
  bookSchema,
  borrowSchema,
  validateAuthor,
  validateBook,
  validateBorrow
};
