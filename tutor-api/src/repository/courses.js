const pool = require('../db')

const get = async () =>{
    try {
        const result = pool.query(`
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

const insert = async (title,description,start_date,end_date,course_location_id) => {
    try{
       const result = await pool.query(`
        INSERT INTO courses
        (title,description,start_date,end_date,course_location_id)
        VALUES
        (?,?,?,?)
        `[title,description,start_date,end_date,course_location_id])
        return result
    }
    catch(err){
        return undefined
    }

}
module.exports ={
    get,
    insert
}