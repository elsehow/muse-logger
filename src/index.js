var kefir = require('kefir')
var db = require('./db')

/*
  devices ---------------------------

 devices are expected to be methods
 they take arguments for configuration,
 then return a Kefir stream of device states.
 the stream has an additional method, stop(),
 which stops the device.

 devices ought to connect, and re-connect
 automatically. we do not provide controls
 for connecting or re-connecting.
 if you need to stop a device temporarily,
 call stop() and initiate a new device.

*/

var timeDevice =
    require('./timeserver-device')

/*
  run(config)

  returns an app - a Kefir stream of app states.
  the stream has an additional method stop(),
  which will disconnect all devices.

  */

function run (config) {

  /*
    a method append(obj)
    to add stuff to the database
    we assume database is strictly ordered. */
  var append = db(config.db.name)


  // construct a list of devices
  var timeS = timeDevice(config.timeserver.url,
                         config.timeserver.interval)
  var devices = [ timeS ]

  // method to stop all devices
  function stop () {
    devices.map(d => d.stop())
  }

  // a stream of all device states
  var stateS =
      kefir.merge(devices)

  // a stream of errors when attempting to save to db
  var dbSaveErrorS = stateS.flatMap(s => {
    return kefir.fromPromise(append(s))
  }).ignoreValues()

  /*
    the application state stream we return
    is a stream of states from all devices,
    and any errors we encounter
    saving device states in the db
    */
  var s = stateS.merge(dbSaveErrorS)

  // attach the stop() method
  s.stop = stop
  // and return the state stream
  return s
}


module.exports = run
