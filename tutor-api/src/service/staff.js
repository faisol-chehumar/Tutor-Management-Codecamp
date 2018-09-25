const { staff, staffRoles, roles } = require('../repository')
const AppError = require('../util/appError')

async function list() {
  const [ staffList, staffRoleList, roleList ] = await Promise.all([ 
    staff.findAll(),
    staffRoles.findAll(),
    roles.findAll()
  ])

  const roleMapped = {}
  roleList.forEach(x => {
    roleMapped[x.role_id] = x.title
  })

  console.log(roleMapped)

  if(staffList.length <= 0) {
    return {}
  }

  staffList.forEach(staff => {
    staffRoleList.forEach(staffRole => {
      if(staff.staffId === staffRole.staffId) {
        staff['role'] = {
          'roleId': staffRole.roleId,
          // 'title': roleList
          'mandayRate': staffRole.mandayRate
        }
      }
    })
    staff
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
