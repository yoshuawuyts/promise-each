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

    const res = arr.reduce(function (prev, curr) {
      return prev.then(fn(curr))
    }, Promise.resolve())

    return res.then(function () {})
  }
}
