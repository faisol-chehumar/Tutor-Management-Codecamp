const pool = require('../db')
  
const get = async () =>{
    console.log("get courses_schedule")
    try {
        const result = await pool.query(`
        SELECT 
        course_schedule_id AS courseScheduleId,
        course_id AS courseId,
        weekday_num AS weekDayNum,
        time_code AS timeCode
        FROM courses_schedule
        `)
        return result[0]
    }
    catch(err){
        console.log(err.message)
        return undefined
    }
}

const getByCourseId = async (courseId) => {
    
    try {
        const result = await pool.query(`
        SELECT 
        course_schedule_id AS courseScheduleId,
        course_id AS courseId,
        weekday_num AS weekDayNum,
        time_code AS timeCode
        FROM courses_schedule
        WHERE  course_id = ?
        `,[courseId])
        return result[0]
    }
    catch(err){
        console.log(err.message)
        return undefined
    }
}

const insert = async (courseId,weekdayNum,timeCode) => {
    try{
       const result = await pool.query(`
        INSERT INTO courses_schedule
        (course_id,weekday_num,time_code)
        VALUES
        (?,?,?)
        `[courseId,weekdayNum,timeCode])
        return result
    }
    catch(err){
        console.log(err.message)
        return undefined
    }

}
const remove = async ({id=null}={}) => {	
	let queryCondition = 'DELETE FROM courses_schedule'
	if(id) {
		queryCondition += ` WHERE courses_schedule.course_id = ${id}`
  }

  try {
    const [results] = await pool.query(
      queryCondition
    )
  
    return results 
  } catch(error) {
    console.error(error)  
  }
}
module.exports ={
    get,
    getByCourseId,
    insert,
    remove
}