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

const insert = async (firstname, lastname, email, tel, mapMarkerId) => {
  try {
    const result = await pool.query(`
      insert into staff
        (firstname, lastname, email, tel, map_marker_id)
      values
        (?, ?, ?, ?, ?)
    `, [ firstname, lastname, email, tel, mapMarkerId ])

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
