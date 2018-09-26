const mappedValue = (objs, [ firstKey, secondKey ]) => {
  console.log(firstKey)
  console.log(secondKey)
  let newObjs = {}
  // objs.forEach(obj => {
  //   newObj['sd'] = obj[secondKey]
  // })
  newObjs.x = 2
  console.log(newObjs)
  return newObjs
}

module.exports = {
  mappedValue
}