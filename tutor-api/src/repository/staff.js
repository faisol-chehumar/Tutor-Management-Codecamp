const pool = require('../db')

const get = async () => {
  const result = await pool.query(`
    SELECT * 
    FROM staff
    LEFT JOIN 
      map_markers 
    ON
      staff.map_marker_id = map_markers.map_marker_id;
  `)

	return result[0]
}

const insert = async (firstname, lastname, email, tel, map_marker_id) => {
	const result = await pool.query(`
		insert into staff
      (firstname, lastname, email, tel, map_marker_id)
		values
			(?, ?, ?, ?, ?)
	`, [ firstname, lastname, email, tel, map_marker_id ])

	return result
}

module.exports = {
  get,
	insert
}
