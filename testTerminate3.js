function testTerminate3(name) {
  let count = 0
  setInterval(() => {
    console.log('testTerminate3')
  }, 1000)
}

module.exports = { testTerminate3 }