const { staff, staffRoles, roles, mapMarkers } = require('../repository')
const {AppError, helper} = require('../util/')

async function list(id='') {
  const [ staffList, staffRoleList, roleList, mapMarkersList ] = await Promise.all([ 
    id !== '' ? staff.findById(id) : staff.findAll() ,
    staffRoles.findAll(),
    roles.findAll(),
    mapMarkers.findAll()
  ])

  const mapMarker = {}

  mapMarkersList.map(x => {
    mapMarker[x.mapMarkerId] = {
      ...x
    }
  })

  const roleTitle = helper.mappedValue(roleList, ['roleId', 'title'])

  if(staffList.length <= 0) {
    return {}
  }

  return staffList.map(staff => {
    const {mapMarkerId, ...y} = {...staff}
    
    return mapMarkerId !== null ? {
      ...y,
      'mapMarker': mapMarker[mapMarkerId],
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
    } : {...staff}
  })
}

async function create(firstname='', lastname='', email='', tel, mapMarkerId, roleId='', mandayRate='') {  
  const isNewStaffValid = await newStaffValidate(firstname, lastname, email, roleId, mandayRate)

  if(isNewStaffValid) {
    const newStaff = await staff.insert(firstname, lastname, email, tel, mapMarkerId)
    await setRole(newStaff.insertId, roleId, mandayRate)
    
    return newStaff.insertId
  }

}

async function remove() {
  await staffRoles.remove()
  await staff.remove()
  return
}

async function setRole(staffId, roleId, mandayRate) {
  const staffRoleId = await staffRoles.insert(staffId, roleId, mandayRate)
  return staffRoleId.insertId
}

async function newStaffValidate(firstname, lastname, email, roleId, mandayRate) {
  const isValidParam = paramValidate(firstname, lastname, email, roleId, mandayRate)
  const isValidRoleId = roleIdValidate(roleId)
  const isValidEmail = await emailValidate(email)

  return isValidParam && isValidRoleId && isValidEmail
}

function paramValidate(firstname, lastname, email, roleId, mandayRate) {
  let requireParam = `${firstname==='' ? 'firstname,' : ''}${lastname==='' ? 'lastname,' : ''}${email==='' ? 'email,' : ''}${roleId==='' ? 'roleId, ' : ''}${mandayRate==='' ? 'mandayRate' : ''}`
  const isValid = firstname && lastname && email && roleId && mandayRate
  
  if(!isValid) {
    throw new AppError(`Bad request, [${requireParam}] required ` , 400)
  }

  return isValid
}

function roleIdValidate(roleId) {
  const isValid = roleId >= 1 && roleId <= 2
  
  if(!isValid) {
    throw new AppError(`Bad request, RoleId should be 1 or 2 ` , 400)
  }

  return isValid
}

async function emailValidate(email) {
  const isDuplicate = (await staff.findByEmail(email)).length > 0
  
  if(isDuplicate) {
    throw new AppError('Email is already use', 400)
  }

  return true
}

module.exports = {
  list,
  create,
  remove,
  setRole,
  roleIdValidate
}
