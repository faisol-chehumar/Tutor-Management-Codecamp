const { staff, staffRoles, roles, staffAvailDaytime, staffRegistrations } = require('../repository')
const {AppError, helper} = require('../util/')

async function list(options) {
  const [ staffList, staffRoleList, roleList, staffAvailDaytimeList, staffRegistrationsList ] = await Promise.all([ 
    staff.get(options),
    staffRoles.get(),
    roles.get(),
    staffAvailDaytime.get(),
    staffRegistrations.get()
  ])

  console.log(staffAvailDaytimeList)
  console.log(staffRegistrationsList)

  const roleTitle = helper.mappedValue(roleList, ['roleId', 'title'])
  // const weekDay = {
  //   0: 'Sunday',
  //   1: 'Monday',
  //   2: 'Tuesday',
  //   3: 'Wednesday',
  //   4: 'Thuesday',
  //   5: 'Friday',
  //   6: 'Saturday',
  // }

  // console.log('staffRegistrations', staffRegistrations)

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
          }),
        'registrations': staffRegistrationsList
          .filter(staffRegis => {
            return staff.staffId === staffRegis.staffId
          })
          .map(staffRegis => {
            return {
              'id': staffRegis.staffRegistrationId,
              'role': roleTitle[staffRegis.roleId]
            }
        }),
        'availDayTime' : staffAvailDaytimeList
          .filter(staffAvailDaytime => {
            return staff.staffId === staffAvailDaytime.staffId
          })
          .map(staffAvailDaytime => {
            return {
              'day': staffAvailDaytime.day,
              'time': staffAvailDaytime.timeCode,
              'status': staffAvailDaytime.statusCode
            }
          }),
      }
    })
}

async function create(staffData) {
  const roles = {
    'tch' : 1,
    'ta' : 2
  }

  if(await isDuplicate(staffData.email)) {
    throw new AppError('Email is already use', 400)
  }
  
  console.log(staffData)

  const result = await staff.insert(staffData)



  for (const day in staffData.availableTime) {
    // staffData.availableTime
    // console.log({
    //   staffId: result.insertId,
    //   day: day,
    //   timeCode: staffData.availableTime[day].time,
    //   statusCode: staffData.availableTime[day].availStatus
    // })
    await staffAvailDaytime.insert({
      staffId: result.insertId,
      day: day,
      timeCode: staffData.availableTime[day].time,
      statusCode: staffData.availableTime[day].availStatus
    })
  }

  for (const role in staffData.roleSetting) {
    await staffRoles.insert({
      staffId: result.insertId,
      roleId: roles[role],
      mandayRate: staffData.roleSetting[role].value
    })
  }

  // console.log(staffData.availableTime)
  // staffData.availableTime.forEach( async time => {
  //   console.log(time)
  //   if(element == 1) {
  //     await staffAvailDaytime.insert({
  //       staffId: result.insertId,
  //       weekdayNum: 1,
  //       timeCode: 'AM',
  //       ...staffData
  //     })
  //   }
  // })

  // if(staffData.roleId === 3) {
  //   await staffRoles.insert({staffId: result.insertId, ...staffData, roleId: 1})
  //   await staffRoles.insert({staffId: result.insertId, ...staffData, roleId: 2})
  //   return result.insertId
  // }

  // await staffRoles.insert({staffId: result.insertId, ...staffData})
  return result.insertId
}

async function remove(id) {
  const result = await staff.getById(id)

  if(result.length <= 0) {
    throw new AppError('Staff not found', 404)
  }

  
  await staffRoles.remove(id)
  await staffAvailDaytime.remove(id)
  await staffRegistrations.removeByStaffId(id)
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
