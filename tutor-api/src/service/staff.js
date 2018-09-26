const { staff, staffRoles, roles } = require('../repository')
const {AppError, helper} = require('../util/')

async function list() {
  const [ staffList, staffRoleList, roleList ] = await Promise.all([ 
    staff.findAll(),
    staffRoles.findAll(),
    roles.findAll()
  ])

  console.log(staffList)
  const titleRoleMapped = helper.mappedValue(roleList, ['roleId', 'title'])
  // console.log(titleRoleMapped)

  if(staffList.length <= 0) {
    return {}
  }

  staffList.forEach(staff => {
    staff['role'] = []
    staffRoleList.forEach(staffRole => {
      if(staff.staffId === staffRole.staffId) {
        staff['role'].push({
          'roleId': staffRole.roleId,
          'title': titleRoleMapped[staffRole.roleId],
          'mandayRate': staffRole.mandayRate
        })
      }
    })
  })

  return staffList
}

async function create(firstname='', lastname='', email='', tel, mapMarkerId, roleId='', mandayRate='') {  
  const isDuplicateEmail = (await staff.findByEmail(email)).length > 0
  const requireField = `${firstname==='' ? 'firstname,' : ''}${lastname==='' ? 'lastname,' : ''}${email==='' ? 'email,' : ''}${roleId==='' ? 'roleId, ' : ''}${mandayRate==='' ? 'mandayRate' : ''}`

  if(!firstname || !lastname || !email || !roleId || !mandayRate) {
    throw new AppError(`Bad request, [${requireField}] required ` , 400)
  }
  
  if(isDuplicateEmail) {
    throw new AppError('Email is already use', 400)
  }

  if(roleId >= 1 && roleId <= 2) {
    const newStaff = await staff.insert(firstname, lastname, email, tel, mapMarkerId)
    await staffRoles.insert(newStaff.insertId, roleId, mandayRate)
    return newStaff.insertId
  }
  
  throw new AppError(`Bad request, RoleId should be 1 or 2 ` , 400)
}

async function remove() {
  await staffRoles.remove()
  await staff.remove()
  return
}

module.exports = {
  list,
  create,
  remove
}
