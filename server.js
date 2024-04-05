const express = require('express');
const app = express();

// Middleware CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'referer, range, accept-encoding, x-requested-with');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Define routes below this middleware
// For example:
// app.get('/example', (req, res) => {
//     res.send('This is an example route');
// });

// Start server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
