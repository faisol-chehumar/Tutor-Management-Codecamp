const pool = require('../db')

const get = async ({
  id = null,
  email = null,
  offset = 0,
  limit = 18446744073709551615
}={}) => {
  const condition = [id, email, offset, limit].filter(elm => elm !== null)
  const query = `
    SELECT
      staff_id AS staffId,
      firstname,
      lastname,
      email,
      tel,
      map_marker_id AS mapMarkerId
    FROM
      staff
  `
  const whereId = `WHERE staff_id = ?`
  const whereEmail = `WHERE email = ?`
  const limitOffset = `LIMIT ?, ?`

  let queryCondition = query
  if(id !== null) {queryCondition += whereId}
  if(email !== null) {queryCondition += whereEmail}
  queryCondition += limitOffset

  console.log(queryCondition)
  console.log(condition)
  
  try {
    const [results] = await pool.query(
      queryCondition
    , condition)

    return results

  } catch (error) {
    console.error(error)
  }
}

const findAll = async () => {
  try {
    const [results] = await pool.query(`
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

    return results

  } catch (error) {
    console.error(error)
  }
}

const findById = async (staffId) => {
  try {
    const [results] = await pool.query(`
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

    return results

  } catch (error) {
    console.error(error)
  }
}

const findByEmail = async (email) => {
  try {
    const [results] = await pool.query(`
      SELECT
        email
      FROM
        staff
      WHERE
        email = (?)
    `, [ email ])

    return results

  } catch (error) {
    console.error(error);
  }
}

const insert = async (firstname, lastname, email, tel, mapMarkerId) => {
  try {
    const [results] = await pool.query(`
      INSERT INTO staff (
        firstname,
        lastname,
        email,
        tel,
        map_marker_id
      ) VALUES (?, ?, ?, ?, ?)
    `, [ firstname, lastname, email, tel, mapMarkerId ])

    return results

  } catch (error) {
    console.error(error)
  }
}

const remove = async () => {
  try {
    const [results] = await pool.query(`
    DELETE FROM staff
	`)

  return results
   
  } catch (error) {
    console.error()
  }
}

module.exports = {
  get,
  findAll,
  findById,
  findByEmail,
  insert,
  remove
}
