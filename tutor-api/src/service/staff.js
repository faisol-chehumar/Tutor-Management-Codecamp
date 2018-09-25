const { staff, staffRoles } = require('../repository')
const AppError = require('../util/appError')

async function list() {
  const [ staffList, staffRoleList ] = await Promise.all([ staff.findAll(), staffRoles.findAll() ])

  if(!staffList || !staffRoleList) {
    throw new AppError(`Bad request` , 400)
  }

  staffList.forEach(staff => {
    staffRoleList.forEach(staffRole => {
      if(staff.staffId === staffRole.staffId) {
        staff['role'] = {'roleId': staffRole.roleId, 'mandayRate': staffRole.mandayRate}
      }
    })
  })

  return [...staffList]
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
  await staff.remove()
}

module.exports = {
  list,
  create,
  remove
}