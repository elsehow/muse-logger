var test = require('tape')
var run = require('..')

var config = {
  db: {
    name: 'dbname3',
  },
  timeserver: {
    url: 'http://cosmopol.is/time',
    interval: 1000,
  }
}

test('works?', t => {

  let app = run(config)
      .log('app stream')

  setTimeout(function () {
    console.log('stopping')
    app.stop()
    t.end()
  }, 3000)
})
