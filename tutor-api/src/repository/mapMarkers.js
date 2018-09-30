const pool = require('../db')

const get = async () => {
  try {
    const [results] = await pool.query(`
      SELECT
        map_marker_id AS mapMarkerId,
        title,
        address,
        lat,
        lng,
        marker_type AS markerType
      FROM
        map_markers;
    `)

    return results
    
  } catch (error) {
    console.error(error)
  }
}

const insert = async ({title=null, address=null, lat=null, lng=null, markerType=null}={}) => {
  try {
    const [results] = await pool.query(`
      INSERT INTO map_markers (
        title,
        address,
        lat,
        lng,
        marker_type
      ) VALUES (?, ?, ?, ?, ?, ?)
    `, [ title, address, lat, lng, markerType ])

    return results
    
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  get,
  insert
}
