const { locations } = require('../repository')
const {AppError} = require('../util')

async function list(options) {
  const [ locationList ] = await Promise.all([ 
    locations.get(options)
  ])
  return locationList
}

async function create(locationData) {
  // const mapMarkerId = await mapMarkers.insert(locationsData)
  const result = await locations.insert(locationData)

  return result.insertId
}

async function remove(option) {
  await locations.remove(option)
  return
}

async function isDuplicate(email) {
  const result = (await locations.get()).filter(location => location.email === email)
  return result.length >= 1
}

module.exports = {
  list,
  create,
  remove
}
