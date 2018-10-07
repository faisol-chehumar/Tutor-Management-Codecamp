const pool = require('../db')

const get = async () => {
    console.log("get courses")
    try {
        const result = await pool.query(`
        SELECT 
        course_id AS courseId,
        location_id AS locationId,
        title,
        description,
        start_date AS startDate,
        end_date AS endDate,
        address_title AS addressTitle,
        address,
        lat,
        lng,
        marker_type AS markerType,
        image_path AS imagePath
        FROM courses
        `)
        return result[0]
    }
    catch (err) {
        console.log(err.message)
        return undefined
    }
}

const getCourseId = async (courseId) => {

    try {
        const result = await pool.query(`
        SELECT         
        course_id AS courseId,
        location_id AS locationId,
        title,
        description,
        start_date AS startDAte,
        end_date AS endDate,
        address_title AS addressTitle,
        address,
        lat,
        lng,
        marker_type AS markerType,
        image_path AS imagePath
        FROM courses
        WHERE  course_id = ?
        `, [courseId])
        return result[0]
    }
    catch (err) {
        console.log(err.message)
        return undefined
    }
}

const insert = async ({ title = null,
    description = null,
    startDate = null,
    endDate = null,
    locationId = null,
    addressTilte = null,
    address = null,
    lat = null,
    lng = null,
    markerType = null,
    imagePath = null } = {}) => {
    try {
        const result = await pool.query(`
        INSERT INTO courses
        (title,description,start_date,end_date,location_id,address_title,address,lat,lng,marker_type,image_path)
        VALUES
        (?,?,?,?,?,?,?,?,?,?,?)
        `[title, description, startDate, endDate, locationId, addressTilte, address, lat, lng, markerType, imagePath])
        return result
    }
    catch (err) {
        console.log(err.message)
        return undefined
    }

}

const remove = async ({ id = null } = {}) => {
    let queryCondition = 'DELETE FROM courses'
    if (id) {
        queryCondition += ` WHERE courses.course_id = ${id}`
    }

    try {
        const [results] = await pool.query(
            queryCondition
        )

        return results
    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    get,
    getCourseId,
    insert,
    remove
}