const mysqlErrors = require('mysql2/lib/constants/errors')
const pool = require('../db')

async function getLocationId(id) {
    try {
       const [result] = await pool.query(`
        SELECT location_id
        FROM locations
        WHERE location_id = ?
        `,[id])
        return result[0] && result[0].location_id
    } catch (err) {
        console.log(err.message);
        return undefined;
    }
    
}

async function findAll() {
    try {
       const [result] = await pool.query(`
        SELECT *
        FROM locations
        `)
        return result
    } catch (err) {
        console.log(err.message);
        return undefined;
    }
}
module.exports ={
    getLocationId,
    findAll

}