

var kefir = require('kefir')
// module.exports = function (connectedS,
//                            uncertainS,
//                            disconnectedS,
//                            battS,
//                            blinkS,
//                            horseshoeS,
//                            eegS,
//                            droppedSamplesS,
//                            accS) {
module.exports = function (eeg, acc, dropped, horseshoe) {

  var dumpS = kefir.interval(1000, 1)

  var streams = [eeg, acc, horseshoe,]
      .map(s => s.map(x => x.values))

  return kefir.combine(
    streams,
    function (e, a, h) {
      return {
        'eeg': e,
        'acc': a,
        'horseshoe': h,
      }
    })
    .bufferBy(dumpS)

  // TODO dropped and other errors
  // 'dropped': d,
  // return kefir.merge([
  //   handle(eeg, 'eeg')
  //   , handle(dropped, 'dropped')
  //   , handle(acc, 'acc')
  //   , handle(horseshoe, 'horsehoe')
  // ])

}
