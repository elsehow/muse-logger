var get = require('simple-get')
var kefir = require('kefir')
var EventEmitter = require('events').EventEmitter

module.exports = function (url, interval=500) {

  var emitter = new EventEmitter()

  function emit (status, time) {
    return emitter.emit('state', {
      status: status,
      time: time,
    })
  }

  function emitTime () {
    function handle (err, res, data) {
      if (err || !data)
        return emit('disconnected', null)
      return emit('connected', new Date(data))
    }
    return get.concat(url, handle)
  }

  emitTime()

  var interval = setInterval(emitTime, interval)

  var s = kefir.fromEvents(emitter, 'state')

  s.stop = function () {
    // emit('disconnected', null)
    clearInterval(interval)
  }

  return s
}
