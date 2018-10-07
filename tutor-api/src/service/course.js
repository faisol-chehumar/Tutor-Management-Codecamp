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
  if (await isDuplicate(coursesData.email)) {
    throw new AppError('Email is already use', 400)
  }

  // const mapMarkerId = await mapMarkers.insert(coursesData)
  const result = await courses.insert(coursesData)

  return result.insertId
}

async function remove(option) {
  await courses.remove(option)
  return
}

async function isDuplicate(email) {
  const result = (await courses.get()).filter(courses => courses.email === email)
  return result.length >= 1
}

module.exports = {
  list,
  create,
  remove
}
