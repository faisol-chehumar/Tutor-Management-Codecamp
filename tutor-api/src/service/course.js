const { courses, coursesEnrolments, coursesSchedule, locations, staffRegistrations } = require('../repository')
const { AppError } = require('../util')

async function list(options) {
  const [coursesList, coursesEnrolmentList, coursesScheduleList, locationList, staffRegistrationList] = await Promise.all([
    courses.get(options),
    coursesEnrolments.get(),
    coursesSchedule.get(),
    locations.get(),
    staffRegistrations.get()
  ])

  return coursesList
  .map(course => {
    return {
      ...course,
      'coursesEnrolment': coursesEnrolmentList
      .filter(coursesEnrolment => {
        return course.courseId === coursesEnrolment.courseId
      })
    }
  })
  .map(course => {
    return {
      ...course,
      'coursesSchedule': coursesScheduleList
      .filter(coursesSchedule => {
        return course.courseId === coursesSchedule.courseId
      })
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
    }
  })
}

async function create(coursesData) {
  const { tchInvitedList, taInvitedList, schedule } = coursesData

  const courseId = await courses.insert(coursesData)
  for (const key in schedule) {
    coursesSchedule.insert({
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
    roleId: 1,
    courseId
  }))


  return courseId.insertId
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
