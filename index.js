const assert  = require('assert')
const Promise = require('native-or-bluebird')

module.exports = each

// Apply a function to all values.
// @param {Mixed|Mixed[]} val
// @param {Mixed} ctx
// @return {Function}
function each(fn, ctx) {
  assert.equal(typeof fn, 'function')
  return function(val) {
    val = Array.isArray(val) ? val : [val]
    return Promise.resolve(val.forEach(fn, ctx))
  }
}
