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

  staffList.map((staff) => {
    return staffRolesList.filter((staffRole) => {
      staff.staff_id === staffRole.staff_id
    })
  })

  return {}
}

module.exports = {
  getStaffDetail
}
