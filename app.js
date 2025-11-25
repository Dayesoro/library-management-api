const express = require('express');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ message: 'Library API is running' });
});

const PORT = 3008;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})