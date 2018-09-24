const { staff, staffRoles } = require('../repository')
const AppError = require('../util/appError')

async function list() {
  const staffList = await staff.findAll()
  const staffRoleList = await staffRoles.findAll()

  if(staffList.length <= 0) {
    throw new AppError(`Staff not found` , 400)
  }

  staffList.forEach(staff => {
    staffRoleList.forEach(staffRole => {
      if(staff.staffId === staffRole.staffId) {
        staff['role'] = staffRole.roleId
      }
    })
  })

  return staffList
}

async function create(firstname='', lastname='', email='', tel, mapMarkerId, role='', mandayRate='') {  
  const isDuplicateEmail = (await staff.findByEmail(email)).length > 0
  const requireField = `${firstname==='' ? 'firstname,' : ''}${lastname==='' ? 'lastname,' : ''}${email==='' ? 'email,' : ''}${role==='' ? 'role, ' : ''}${mandayRate==='' ? 'mandayRate' : ''}`

  if(!firstname || !lastname || !email || !role || !mandayRate) {
    throw new AppError(`Bad request, [${requireField}] required ` , 400)
  }
  
  if(isDuplicateEmail) {
    throw new AppError('Email is already use', 400)
  }

  const newStaff = await staff.insert(firstname, lastname, email, tel, mapMarkerId)
  return await staffRoles.insert(newStaff.insertId, role, mandayRate)
}

async function remove() {
  await staffRoles.remove()
  return await staff.remove()
}

module.exports = {
  list,
  create,
  remove
}
