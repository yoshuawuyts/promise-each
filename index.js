const Promise = require('any-promise')
const assert = require('assert')

module.exports = each

// apply a function to all values
// should only be used for side effects
// (fn, obj?) -> prom
function each (fn, ctx) {
  assert.equal(typeof fn, 'function')
  return function (arr) {
    arr = Array.isArray(arr) ? arr : [arr]

    return arr.reduce(function (prev, curr, i) {
      return prev.then(function () { return fn(curr, i) })
    }, Promise.resolve()).then(function () {})
  }
}
