const express = require('express');
const logger = require('./middleware/logger');
const responseFormatter = require('./middleware/responseFormatter');

const app = express();

app.use(express.json());
app.use(logger);
app.use(responseFormatter);

app.get('/health', (req, res) => {
    res.success({ message: 'Library API is running' });
});

const PORT = 3008;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})