const pool = require('../db')

const get = async () =>{
    console.log("get courses")
    try {
        const result = await pool.query(`
        SELECT *
        FROM courses
        `)
        return result[0]
    }
    catch(err){
        console.log(err.message)
        return undefined
    }
}

const getCourseId = async (courseId) => {
    
    try {
        const result = await pool.query(`
        SELECT course_id,title,description,start_date,end_date,course_location_id
        FROM courses
        WHERE  course_id = ?
        `,[courseId])
        return result[0]
    }
    catch(err){
        console.log(err.message)
        return undefined
    }
}

const insert = async (title,description,startDate,endDate,courseLocationId) => {
    try{
       const result = await pool.query(`
        INSERT INTO courses
        (title,description,start_date,end_date,course_location_id)
        VALUES
        (?,?,?,?)
        `[title,description,startDate,endDate,courseLocationId])
        return result
    }
    catch(err){
        console.log(err.message)
        return undefined
    }

}
module.exports ={
    get,
    getCourseId,
    insert
}