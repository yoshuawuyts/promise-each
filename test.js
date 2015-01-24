const test    = require('tape')
const each  = require('./')
const Promise = require('native-or-bluebird')

test('promise-each should assert input types', function(t) {
  t.plan(1)
  t.throws(each.bind(null, 123))
})

test('promise-each should call a fn for each value in arr', function(t) {
  t.plan(1)

  var arr = []

  const res = Promise.resolve([1, 2, 3])
    .then(each(eachFn))
    .then(checkFn)
    .catch(handleErr)

  function eachFn(val) {
    return arr.push(val)
  }

  function checkFn(val) {
    t.deepEqual([1, 2, 3], arr)
  }

  function handleErr() {
    t.fail('catch')
  }
})
