/*
Instance new thread and kill when timeout
*/




const express = require('express');
const app = express();
const { fork } = require('child_process');
const { cwd } = require('process');
// const { testTerminate1 } = require('./testTerminate1');

// Define a timeout threshold in milliseconds
const TIMEOUT_THRESHOLD = 5000; // 5 seconds

// Middleware to handle pending requests
app.use((req, res, next) => {
    // const timer = setTimeout(() => {
    //     if (!res.headersSent) {
    //         res.status(504).json({ error: 'Request timeout' });
    //         console.log('Timeout');
    //         if (childProcess1) {
    //             childProcess1.kill(); // Terminate the first child process
    //             console.log('kill')
    //         }
    //     }
    // }, TIMEOUT_THRESHOLD);

    // req.timer = timer;
    next();
});


// Your route handlers
app.get('/', (req, res) => {
    // Spawn a child process to run testTerminate1
    // console.time('parent' + req.query.userId)
    const childProcess = fork("testTerminate1.js")
    childProcess.send({ fn: "testTerminate1", params: req.query })

    childProcess.on("message", (eventChild) => {
        // console.timeEnd('parent' + req.query.userId)
        console.log(eventChild)
        childProcess.kill()
        if (eventChild === 'timeout') {
            console.log(req.query, 'timeout')
            res.json({ message: 'timeout' })
        } else {
            res.json({ message: 'Request completed successfully', eventChild });
        }
    })

});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
