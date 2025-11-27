// Adds helper methods to the response object for consistent API responses
const responseFormatter = (req, res, next) => {

    // Add a success method to the response object
    res.success = (data, statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            data: data
        });
    };

    // Add an error method to the response object
    res.error = (message, statusCode = 400) => {
        return res.status(statusCode).json({
            success: false,
            error: message
        });
    };
    
    next();
}

module.exports = responseFormatter;