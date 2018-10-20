const { staff, staffRoles, roles, staffAvailDaytime } = require('../repository')
const {AppError, helper} = require('../util/')

async function list(options) {
  const [ staffList, staffRoleList, roleList, staffAvailDaytimeList ] = await Promise.all([ 
    staff.get(options),
    staffRoles.get(),
    roles.get(),
    staffAvailDaytime.get()
  ])

  console.log(staffAvailDaytimeList)

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
  // const day = {
  //   'Sunday' : 0,
  //   'Monday' : 1,
  //   'Tuesday' : 2,
  //   'Wednesday' : 3,
  //   'Thuesday' : 4,
  //   'Friday' : 5,
  //   'Saturday' : 6,
  // }

  if(await isDuplicate(staffData.email)) {
    throw new AppError('Email is already use', 400)
  }
  
  console.log(staffData)

  const result = await staff.insert(staffData)



  for (const day in staffData.availableTime) {
    staffData.availableTime
    console.log({
      staffId: result.insertId,
      day: day,
      timeCode: staffData.availableTime[day].time,
      statusCode: staffData.availableTime[day].availStatus
    })
    await staffAvailDaytime.insert({
      staffId: result.insertId,
      day: day,
      timeCode: staffData.availableTime[day].time,
      statusCode: staffData.availableTime[day].availStatus
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
