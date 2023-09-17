function testTerminate1(name) {
    let count = 0
    setInterval(() => {
        console.log(name, count++)
    }, 1000)
}

module.exports = { testTerminate1 }