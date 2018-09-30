const { staff, staffRoles, roles, mapMarkers } = require('../repository')
const {AppError, helper} = require('../util/')

async function list(options) {
  const [ staffList, staffRoleList, roleList, mapMarkersList ] = await Promise.all([ 
    staff.get(options),
    staffRoles.get(),
    roles.get(),
    mapMarkers.get()
  ])

  const roleTitle = helper.mappedValue(roleList, ['roleId', 'title'])
  const mapMarker = {}
  
  mapMarkersList.forEach(x => {
    mapMarker[x.mapMarkerId] = {
      ...x
    }
  })

  return staffList
    .map(staff => {
      const {mapMarkerId, ...y} = {...staff}
      
      return mapMarkerId !== null ? {
        ...y,
        'mapMarker': mapMarker[mapMarkerId]
      } : {...y, mapMarker: null}
    })
    .map(staff => {
      return {
        ...staff,
        'role': staffRoleList
        .filter(staffRole => {
          return staff.staffId === staffRole.staffId
        })
        .map(staffRole => {
          return {
            'id': staffRole.roleId,
            'title': roleTitle[staffRole.roleId],
            'mandayRate': staffRole.mandayRate
          }
        })
      }
    })
}

async function create(staffData) {
  if(await isDuplicate(staffData.email)) {
    throw new AppError('Email is already use', 400)
  }
  
  // const mapMarkerId = await mapMarkers.insert(staffData)
  const result = await staff.insert(staffData)
  await staffRoles.insert({staffId: result.insertId,...staffData})

  return result.insertId
}

async function remove(option) {
  await staffRoles.remove(option)
  await staff.remove(option)
  return
}

async function isDuplicate(email) {
  const result = (await staff.get()).filter(staff => staff.email === email)
  return result.length >= 1
}

module.exports = {
  list,
  create,
  remove
}
