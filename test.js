const Promise = require('any-promise')
const test = require('tape')
const each = require('./')

test('promise-each should assert input types', function (t) {
  t.plan(1)
  t.throws(each.bind(null, 123))
})

test('should call a fn for each value in arr', function (t) {
  t.plan(3)

  var indexes = []
  var lengths = []
  var values = []

  Promise.resolve([1, 2, 3])
    .then(each(eachFn))
    .then(checkFn)
    .catch(handleErr)

  function eachFn (val, i, length) {
    indexes.push(i)
    lengths.push(length)
    return values.push(val)
  }

  function checkFn (val) {
    t.deepEqual(indexes, [0, 1, 2])
    t.deepEqual(lengths, [3, 3, 3])
    t.deepEqual(values, [1, 2, 3])
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

  var arr = []

  Promise.resolve([late, early, check])
    .then(each(eachFn))

  function eachFn (fn) {
    const val = fn()
    return val
  }

  function early () {
    arr.push('early')
  }

  function late () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        arr.push('late')
        resolve()
      }, 50)
    })
  }

  function check () {
    t.deepEqual(arr, ['late', 'early'])
  }
})
