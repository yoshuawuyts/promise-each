const Promise = require('any-promise')
const expect = require('args-expect')

module.exports = each

// apply a function to all values
// should only be used for side effects
// (fn) -> prom
function each (fn) {
  expect(fn).isFunction()
  return function (arr) {
    arr = Array.isArray(arr) ? arr : [arr]

    return arr.reduce(function (prev, curr, i) {
      return prev.then(function () { return fn(curr, i, arr.length) })
    }, Promise.resolve()).then(function () {})
  }
}
