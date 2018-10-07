const { staff, staffRoles, roles } = require('../repository')
const {AppError, helper} = require('../util/')

async function list(options) {
  const [ staffList, staffRoleList, roleList ] = await Promise.all([ 
    staff.get(options),
    staffRoles.get(),
    roles.get()
  ])

  console.log(staffList)

  const roleTitle = helper.mappedValue(roleList, ['roleId', 'title'])

  return staffList
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

async function remove(id) {
  const result = await staff.getById(id)

  if(result.length <= 0) {
    throw new AppError('Staff not found', 404)
  }
  await staffRoles.remove(id)
  await staff.remove(id)
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
