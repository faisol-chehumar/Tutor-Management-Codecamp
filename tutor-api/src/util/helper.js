const mappedValue = (objs, [ firstKey, secondKey ]) => {

  let newObjs = {}
  let key, value

  objs.forEach(obj => {
    key = obj[firstKey]
    value = obj[secondKey]

    newObjs[key] = value
  })

  return newObjs
}

module.exports = {
  mappedValue
}