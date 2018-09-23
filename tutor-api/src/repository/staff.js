const pool = require('../db')

const get = async () => {
  try {
    const result = await pool.query(`
      SELECT * 
      FROM staff
      LEFT JOIN 
        map_markers 
      ON
        staff.map_marker_id = map_markers.map_marker_id;
    `)
    
    return result[0]

  } catch(error) {
    console.error(error)
    return error
  }
}

const insert = async (firstname, lastname, email, tel, map_marker_id) => {
  try {
    const result = await pool.query(`
      INSERT INTO staff
        (firstname, lastname, email, tel, map_marker_id)
      VALUES
        (?, ?, ?, ?, ?);
      `, [ firstname, lastname, email, tel, map_marker_id ])

    return result
     
  } catch(error) {
    console.error(error)
    return error
  }
}

module.exports = {
  get,
	insert
}
