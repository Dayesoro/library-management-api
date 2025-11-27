// Checks for API key in request headers
// Required API key: express_app_2025
const auth = (req, res, next) => {

    // Get the API key from the request headers
    const apiKey = req.headers['x-api-key'];
    
    // Check if API key is provided
    if (!apiKey) {
        return res.error('API key is required', 410);
    }

    // Check if API key is correct
    if (apiKey !== 'express_app_2025') {
    return res.error('Invalid API key', 401);
  }

    next();
}