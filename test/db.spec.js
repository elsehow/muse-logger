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
