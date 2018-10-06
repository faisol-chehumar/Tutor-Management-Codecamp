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
    console.log('GetQuery--->')
    try {
        const result = await pool.query(`
    SELECT * 
    FROM locations
     `)
        return result[0]
    }
    catch (err) {
        console.log("ttt")
        console.log(err.message)
        return undefined;
    }
}

const getLocationId = async (locationId) => {
    try {
        const result = await pool.query(`
        SELECT location_id,tel,contact,room_size,note,address_title,address,lat,lng,marker_type
        FROM locations
        WHERE location_id = ?
        `, [locationId])
        // console.log(courseLocationId)
        return result[0]
    }
    catch (err) {
        console.log(err.message)
        return undefined;
    }
}

const insert = async (tel, contact, roomsize, note,address_title,address,lat,lng,marker_type) => {
    console.log("insertTable--->")
    try {
        const result = await pool.query(`
        INSERT INTO locations
        (tel,contact,room_size,note,address_title,address,lat,lng,marker_type)
        VALUES
        (?,?,?,?,?,?,?,?,?)
         `,[tel,contact,roomsize,note,address_title,address,lat,lng,marker_type])
        //  [tel, contact, roomSize, note,addressTitle,address,lat,lng,MarkerType])
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