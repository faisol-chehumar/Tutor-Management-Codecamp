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

module.exports = {
  get
}
