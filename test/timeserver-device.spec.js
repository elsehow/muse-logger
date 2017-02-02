var test = require('tape')

test('can append stuff', t => {
  t.plan(1)
  var db = require('../src/db')
  var append = db('dbname2')
  append({
    hello: 'hi',
    label: 'whatever',
  }).then((res) => {
    t.ok(res)
  }).catch((err) => {
    t.notOk(err)
  })
})

function testTimeServer (t, url, ok, cb) {
  var timeserverS =
      require('../src/timeserver-device')
  var timeS = timeserverS(url, 500)
  t.ok(timeS)
  timeS.onError(t.notOk)
  function checkGood (v) {
    t.deepEquals(v.status, 'connected')
    t.ok(v.time.getMonth())
  }
  function checkBad (v) {
    t.deepEquals(v.status, 'disconnected')
    t.deepEquals(v.time, null)
  }
  timeS.onValue(v => {
    if (ok) {
      checkGood(v)
    } else {
      checkBad(v)
    }
    timeS.stop()
    cb()
  })
}

test('can get stream from timeserver', t => {
  testTimeServer (t, 'fake-url', false, function () {
    testTimeServer (t, 'http://cosmopol.is/time', true, function () {
      t.end()
    })
  })
})
