const pool = require('../db')

const findAll = async () => {
  try {
    const [result] = await pool.query(`
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

    return result
    
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  findAll
}
