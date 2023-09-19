const { testTerminate2 } = require("./testTerminate2")

process.on("message", (eventMsg) => {
    console.log('event =>', eventMsg)
    if (eventMsg.fn === "testTerminate1") {
        testTerminate1(eventMsg.params)
    }
})

function testTerminate1({ userId, timecount }) {
    let count = 0
    timecount = +timecount
    // testTerminate2()
    setInterval(() => {
        count++
        console.log(process.pid, userId)
        if (count === timecount) {
            // console.log('exit from child')
            // process.exit()
            clearTimeout()
            process.send(`send event from child to parent by ${userId}`)
        }
    }, 1000)

    setTimeout(() => {
        console.log(`${userId} is timeout`)
        process.send('timeout')
    }, 5000)
}

module.exports = { testTerminate1 }