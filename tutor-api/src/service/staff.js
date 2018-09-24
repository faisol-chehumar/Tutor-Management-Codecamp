const repo = require('../repository')
// const AppError = require('../util/appError')

const {staff, roles, staffRoles} = repo

async function getStaffDetail () {
  const staffList = await staff.get()
  const rolesList = await roles.get()
  const staffRolesList = await staffRoles.get()
  
  // console.log(staffList)
  // console.log(rolesList)
  // console.log(staffRolesList)

  for (const iterator of staffList) {
    console.log(iterator)
  }

  return {}
}

module.exports = {
  getStaffDetail
}
