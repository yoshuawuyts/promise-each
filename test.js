const Promise = require('native-or-bluebird')
const test = require('tape')
const each = require('./')

test('promise-each should assert input types', function (t) {
  t.plan(1)
  t.throws(each.bind(null, 123))
})

test('should call a fn for each value in arr', function (t) {
  t.plan(1)

  var arr = []

  Promise.resolve([1, 2, 3])
    .then(each(eachFn))
    .then(checkFn)
    .catch(handleErr)

  function eachFn (val) {
    return arr.push(val)
  }

  function checkFn (val) {
    t.deepEqual([1, 2, 3], arr)
  }

  function handleErr () {
    t.fail('catch')
  }
})

test('should call n when n=1', function (t) {
  t.plan(1)

  Promise.resolve(1)
    .then(each(eachFn))
    .then(function () {t.pass('ok')})

  function eachFn () {
    return arguments
  }
})

test('should not return values', function (t) {
  t.plan(1)

  Promise.resolve([1, 2, 3])
    .then(each(eachFn))
    .then(function (arg) {t.notOk(arg, 'no arguments')})

  function eachFn () {
    return arguments
  }
})

test('should wait for promises to be resolved', function (t) {
  t.plan(1)

  var n = 0

  Promise.resolve([late, check])
    .then(each(eachFn))

  function eachFn (fn) {
    const val = fn()
    return val
  }

  function late () {
    return function () {
      return new Promise(function (fullfil) {
        setTimeout(function () {
          n++
          fullfil()
        }, 50)
      })
    }
  }

  function check () {
    return function () {
      t.equal(n, 1)
    }
  }
})
