var PouchDB = require('pouchdb')

// db.changes().on('change', function() {
//     console.log('Ch-Ch-Changes');
// });


module.exports = function (path, replicateTo) {
  var db = new PouchDB(path)
  if (replicateTo)
    db.replicate.to(replicateTo)
  function append (obj) {
    obj._id = ''+Date.now() // TODO better ids
    return db.put(obj)
  }
  return append
}
