const pool = require('../db')

// async function get(id) {
//     try {
//         const [result] = await pool.query(`
//         SELECT *
//         FROM locations
//         WHERE room_size = ?
//         `, [room_size])
//         return result[0] && result[0].location_id
//     } catch (err) {
//         console.log(err.message);
//         return undefined;
//     }

// }

const get = async () => {
    console.log('ssdsd')
    try {
        const result = await pool.query(`
    SELECT * 
    FROM courses_locations
     `)
        return result[0]
    }
    catch (err) {
        console.log("ttt")
        console.log(err.message)
        return undefined;
    }
}

const getLocationId = async (courseLocationId) => {
    try {
        const result = await pool.query(`
        SELECT course_location_id,tel,contact,room_size,note,map_marker_id
        FROM courses_locations
        WHERE course_location_id = ?
        `, [courseLocationId])
        // console.log(courseLocationId)
        return result[0]
    }
    catch (err) {
        console.log(err.message)
        return undefined;
    }
}

const insert = async (tel, contact, roomSize, note, mapMarkerId) => {
    try {
        const result = await pool.query(`
            INSERT INTO courses_locations
            (tel,contact,room_size,note,map_marker_id)
            VALUES
            (?,?,?,?,?)
            `[tel, contact, roomSize, note, mapMarkerId])
        return result
    }
    catch (err) {
        console.log(err.message)
        return undefined;
    }
}
module.exports = {
    get,
    getLocationId,
    insert

}