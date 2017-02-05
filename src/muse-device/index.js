var transform = require('./transform')
var nodeMuse = require("node-muse")
var Muse = nodeMuse.connect().Muse
var kefir = require('kefir')

var events = [
    [Muse, '/muse/eeg'],
    [Muse, '/muse/acc'],
    [Muse, '/muse/eeg/dropped_samples'],
    [Muse, '/muse/elements/horseshoe'] //for each chan, 1=good, 2=ok, >=3 bad
]

var streams = events.map(([em, ev]) => kefir.fromEvents(em,ev))

var deviceStream = transform.apply(null, streams)

deviceStream.log()
