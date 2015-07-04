const Promise = require('native-or-bluebird')
const assert = require('assert')

module.exports = each

// apply a function to all values
// (fn, obj?) -> [any]|any
function each (fn, ctx) {
  assert.equal(typeof fn, 'function')
  return function (val) {
    val = Array.isArray(val) ? val : [val]
    return Promise.resolve(val.forEach(fn, ctx))
  }
}
