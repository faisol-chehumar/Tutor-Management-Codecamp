const pool = require('../db')

const get = async () => {
  try {
    const result = await pool.query(`
      SELECT staff_id, roles.title, manday_rate
      FROM staff_roles
      LEFT JOIN
        roles ON staff_roles.role_id = roles.role_id
    `)
    
    return result[0]

  } catch(error) {
    console.error(error)
    return error
  }
}

const insert = async (staffId, roleId, mandayRate) => {
  try {
    const result = await pool.query(`
      INSERT INTO staff_roles
        (staff_id, role_id, manday_rate)
      VALUES
        (?, ?, ?);
      `, [ staffId, roleId, mandayRate ])

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
