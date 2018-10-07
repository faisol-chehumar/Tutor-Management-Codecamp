const pool = require('../db')
const get = async () => {
    console.log('locations')
    try {
        const result = await pool.query(`
        SELECT 
            location_id AS locationId,
            tel,
            contact,
            room_size AS roomSize,
            note,
            address_title AS addressTitle,
            address,
            lat,
            lng,
            marker_type AS makerType
        FROM locations
     `)
        return result[0]
    }
    catch (err) {
        console.log(err.message)
        return undefined;
    }
}

const getByLocationId = async (locationId) => {
    try {
        const result = await pool.query(`
        SELECT             
            location_id AS locationId,
            tel,
            contact,
            room_size AS roomSize,
            note,
            address_title AS addressTitle,
            address,
            lat,
            lng,
            marker_type AS makerType
        FROM locations
        WHERE location_id = ?
        `, [locationId])
        return result[0]
    }
    catch (err) {
        console.log(err.message)
        return undefined;
    }
}

const insert = async (tel=null, contact=null, roomSize=null, note=null, addressTitle=null,address=null,lat=null,lng=null,markerType=null) => {
    try {
        const result = await pool.query(`
            INSERT INTO courses_locations
            (tel, contact, room_size, note, address_title, address, lat, lng, marker_type)
            VALUES
            (?,?,?,?,?,?,?,?,?)
            `[tel, contact, roomSize, note, addressTitle,address,lat,lng,markerType])
        return result
    }
    catch (err) {
        console.log(err.message)
        return undefined;
    }
}
module.exports = {
    get,
    getByLocationId,
    insert

}