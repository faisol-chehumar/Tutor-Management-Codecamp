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
  const weekDay = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thuesday',
    5: 'Friday',
    6: 'Saturday',
  }

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
              'day': weekDay[staffAvailDaytime.weekdayNum],
              'time': staffAvailDaytime.timeCode,
              'status': staffAvailDaytime.statusCode
            }
          }),
      }
    })
}

async function create(staffData) {
  if(await isDuplicate(staffData.email)) {
    throw new AppError('Email is already use', 400)
  }
  
  // const mapMarkerId = await mapMarkers.insert(staffData)
  const result = await staff.insert(staffData)
  console.log(staffData.availDayTime)
  console.log(staffData.mandayRate)
  
  staffData.availDayTime.forEach( async element => {
    if(element == 1) {
      await staffAvailDaytime.insert({
        staffId: result.insertId,
        weekdayNum: 1,
        timeCode: 'AM',
        ...staffData
      })
    }
    if(element == 2) {
      await staffAvailDaytime.insert({
        staffId: result.insertId,
        weekdayNum: 1,
        timeCode: 'PM',
        ...staffData
      })
    }
    if(element == 3) {
      await staffAvailDaytime.insert({
        staffId: result.insertId,
        weekdayNum: 2,
        timeCode: 'AM',
        ...staffData
      })
    }
  })

  if(staffData.roleId === 3) {
    // console.log('roleId === 3')
    // console.log({staffId: result.insertId, ...staffData, roleId: 1})
    await staffRoles.insert({staffId: result.insertId, ...staffData, roleId: 1})
    await staffRoles.insert({staffId: result.insertId, ...staffData, roleId: 2})
    return result.insertId
  }

  await staffRoles.insert({staffId: result.insertId, ...staffData})
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
