const { courses, coursesSchedule } = require('../repository')
const mapDay = {}
mapDay['Monday'] = 1
mapDay['Tuesday'] = 2
mapDay['Wednesday'] = 3
mapDay['Thursday'] = 4
mapDay['Friday'] = 5
mapDay['Saturday'] = 6
mapDay['Sunday'] = 0

async function list(options) {
    const [coursesList, coursesScheduleList] = await Promise.all([
        courses.get(options),
        coursesSchedule.get(),

    ])

    return coursesList
        .map(course => {

            let schedule = coursesScheduleList
                .filter(coursesSchedule => {
                    return course.courseId === coursesSchedule.courseId
                })
            let start = '21:00'
            let end = '22:00'
            let dow = []
            for (const key in schedule) {
                if(schedule[key].timeCode == 'am'){
                    start = '09:00'
                    end = '12:00'
                }
                if(schedule[key].timeCode == 'pm'){
                    start = '13:00'
                    end = '17:00'
                }
                if(schedule[key].timeCode == 'fullDay'){
                    start = '09:00'
                    end = '17:00'
                }
                dow.push(mapDay[schedule[key].day])
            }
            return {
                title: course.title,
                start: start,
                end: end, 
                dow: dow, 
                ranges: [{
                    start: course.startDate,
                    end: course.endDate
                }],
                url: 'http://localhost:3000/courses/' + course.courseId,

            }
        })
}


module.exports = {
    list
}
