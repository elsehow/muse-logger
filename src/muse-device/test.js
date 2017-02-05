var nodeMuse = require("node-muse")
var Muse = nodeMuse.connect().Muse
var charm = require('simple-charm')
function pathTo (filename) {
  return require('path').join(__dirname, filename)
}

// TODO

// THIS DOESNT WORK!!!!!!!!!!!!!!!!!!!!!!



// http://developer.choosemuse.com/research-tools/available-data#Raw_EEG
var app = pathTo('/transform.js')
charm(app,
              // [Muse, 'connected'],
              // [Muse, 'uncertain'],
              // [Muse, 'disconnected'],
              // [Muse, '/muse/batt'],
              // [Muse, '/muse/elements/blink'],
              [Muse, '/muse/eeg'],
              [Muse, '/muse/acc'],
              [Muse, '/muse/eeg/dropped_samples'],
              [Muse, '/muse/elements/horseshoe'] //for each chan, 1=good, 2=ok, >=3 bad
)


