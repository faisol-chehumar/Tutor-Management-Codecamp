const { courses, customers, staff, coursesEnrolments, coursesSchedule, locations, staffRegistrations } = require('../repository')
const { AppError } = require('../util')

async function list(options) {
  const [coursesList, coursesEnrolmentList, coursesScheduleList, locationList, staffRegistrationList, customersList, staffList] = await Promise.all([
    courses.get(options),
    coursesEnrolments.get(),
    coursesSchedule.get(),
    locations.get(),
    staffRegistrations.get(),
    customers.get(),
    staff.get()
  ])

  console.log('staffList')
  console.log(staffList)

  return coursesList
  .map(course => {
    return {
      ...course,
      'coursesEnrolment': coursesEnrolmentList
        .filter(coursesEnrolment => {
          return course.courseId === coursesEnrolment.courseId
        })
        .map(coursesEnrolment => customersList
          .filter(customer => customer.customerId === coursesEnrolment.customerId)
        )
    }
  })
  .map(course => {
    return {
      ...course,
      'coursesSchedule': coursesScheduleList
        .filter(coursesSchedule => {
          return course.courseId === coursesSchedule.courseId
        }
      )
    }
  })
  .map(course => {
    return {
      ...course,
      'location': locationList
        .filter(location => {
          return course.locationId === location.locationId
        })
    }
  })
  .map(course => {
    return {
      ...course,
      'staffRegistration': staffRegistrationList
        .filter(staffRegistration => {
          return course.courseId === staffRegistration.courseId
        })
        .map(staffRegistration => {
          const [staffData] = staffList.filter(staff => staff.staffId === staffRegistration.staffId)
          return {
            ...staffData,
            regisRole: staffRegistration.roleId
          }
        })
    }
  })
}

async function create(coursesData) {
  const { tchInvitedList, taInvitedList, schedule, customerEnroll } = coursesData

  const courseId = (await courses.insert(coursesData)).insertId

  for (const key in schedule) {
    await coursesSchedule.insert({
      courseId,
      day: key,
      timeCode: schedule[key].time
    })
  }

  tchInvitedList.forEach(async tch => await staffRegistrations.insert({
    staffId: tch.id,
    roleId: 1,
    courseId
  }))

  taInvitedList.forEach(async tch => await staffRegistrations.insert({
    staffId: tch.id,
    roleId: 2,
    courseId
  }))

  customerEnroll.forEach(async customer => await coursesEnrolments.insert({
    customerId: customer.id,
    courseId
  }))


  return courseId
}

async function remove(option) {
  await courses.remove(option)
  return
}

module.exports = {
  list,
  create,
  remove
}
