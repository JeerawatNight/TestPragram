const { testTerminate3 } = require("./testTerminate3")

function testTerminate2(name) {
  let count = 0
  testTerminate3()
  setInterval(() => {
    console.log('testTerminate2')
  }, 1000)
}

module.exports = { testTerminate2 }