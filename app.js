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
            res.status(504).json({ error: 'Request timeout' });
            console.log('Timeout');
            if (childProcess1) {
                childProcess1.kill(); // Terminate the first child process
                console.log('kill')
            }
        }
    }, TIMEOUT_THRESHOLD);

    req.timer = timer;
    next();
});

let childProcess1;

// Your route handlers
app.get('/', (req, res) => {
    // Spawn a child process to run testTerminate1
    childProcess1 = spawn('node', ['testTerminate1.js', req.query.name]);

    // Handle the child process exit event
    // childProcess1.on('exit', (code) => {
    //     clearTimeout(req.timer); // Clear the timeout
    //     if (code === 0) {
    //         // Success: The function completed within the timeout
    //         res.json({ message: 'Function executed successfully' });
    //     } else {
    //         // Termination: The function exceeded the timeout
    //         res.status(504).json({ error: 'Request timeout' });
    //         console.log('Timeout');
    //     }
    // });

    // Run testTerminate1 asynchronously
    testTerminate1(req.query.name);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
