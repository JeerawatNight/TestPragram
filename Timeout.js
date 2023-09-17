const express = require('express');
const app = express();
const { spawn } = require('child_process');
const { testTerminate1 } = require('./testTerminate1');

// Define a timeout threshold in milliseconds
const TIMEOUT_THRESHOLD = 5000; // 5 seconds

// Middleware to handle pending requests
app.use((req, res, next) => {

    const timer = setTimeout(() => {
        if (!res.headersSent) {
            res.status(504).json({ error: 'Request timeout' })
            console.log('Timeout')
        }


    }, TIMEOUT_THRESHOLD);

    req.timer = timer;

    next();
});

// Your route handlers
app.get('/', (req, res) => {
    // Simulate a long-running operation
    // testTerminate1(req.query.name)
    setTimeout(() => {
        // Respond to the request
        if (!res.headersSent) {
            res.json({ message: 'Request completed successfully' });
        }
        // Clear the timer since the request has completed
        clearTimeout(req.timer);
        console.log('clearTimeout(req.timer);')
    }, 10000); // Simulating 2 seconds of processing time
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
