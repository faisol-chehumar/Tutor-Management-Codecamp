const pool = require('../db')

const findAll = async () => {
  try {
    const result = await pool.query(`
      SELECT
        staff_id AS staffId,
        firstname,
        lastname,
        email,
        tel,
        map_marker_id AS mapMarkerId
      FROM
        staff
    `)

    return result[0]

  } catch (error) {
    console.error(error)
  }
}

const findById = async (staffId) => {
  try {
    const [result] = await pool.query(`
      SELECT
        staff_id AS staffId,
        firstname,
        lastname,
        email,
        tel,
        map_marker_id AS mapMarkerId
      FROM
        staff
      WHERE
        staff_id = (?)
    `, [ staffId ])

    return result

  } catch (error) {
    console.error(error)
  }
}

const findByEmail = async (email) => {
  try {
    const [result] = await pool.query(`
      SELECT
        email
      FROM
        staff
      WHERE
        email = (?)
    `, [ email ])

    return result

  } catch (error) {
    console.error(error);
  }
}

const insert = async (firstname, lastname, email, tel, mapMarkerId) => {
  try {
    const [result] = await pool.query(`
      INSERT INTO staff (
        firstname,
        lastname,
        email,
        tel,
        map_marker_id
      ) VALUES (?, ?, ?, ?, ?)
    `, [ firstname, lastname, email, tel, mapMarkerId ])

    return result

  } catch (error) {
    console.error(error)
  }
}

const remove = async () => {
  try {
    const [result] = await pool.query(`
    DELETE FROM staff
	`)

  return result
   
  } catch (error) {
    console.error()
  }
}

module.exports = {
  findAll,
  findById,
  findByEmail,
  insert,
  remove
}
