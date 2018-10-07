
const pool = require('../db')

const get = async ({
  offset = null,
  limit = null
  }={}) => {
  const condition = [offset, limit].filter(elm => elm !== null)
  const query = `
    SELECT
      staff_id AS staffId,
      firstname,
      lastname,
      email,
      tel,
      address_title AS addressTitle,
      address,
      lat,
      lng,
      marker_type AS markerType
    FROM
      staff
  `
  let queryCondition = query
  
  if(limit !== null) {queryCondition += `LIMIT ${limit}`} // Can't use prepare statement
  
  try {
    const [results] = await pool.query(
      queryCondition
    , condition)

    return results

  } catch (error) {
    console.error(error)
  }
}

// const getById = async ({
//   id = null,
//   offset = null,
//   limit = null
//   }={}) => {
//   const condition = [id, offset, limit].filter(elm => elm !== null)
//   const query = `
//     SELECT
//       staff_id AS staffId,
//       firstname,
//       lastname,
//       email,
//       tel,
//       map_marker_id AS mapMarkerId
//     FROM
//       staff
//   `
//   const whereId = `WHERE staff_id = ?`

//   let queryCondition = query
//   if(id !== null) {queryCondition += whereId}
//   if(limit !== null) {queryCondition += `LIMIT ${limit}`} // Can't use prepare statement
  
//   try {
//     const [results] = await pool.query(
//       queryCondition
//     , condition)

//     return results

//   } catch (error) {
//     console.error(error)
//   }
// }

// const getByEmail = async ({
//   email = null,
//   offset = null,
//   limit = null
//   }={}) => {
//   const condition = [email, offset, limit].filter(elm => elm !== null)
//   const query = `
//     SELECT
//       staff_id AS staffId,
//       firstname,
//       lastname,
//       email,
//       tel,
//       map_marker_id AS mapMarkerId
//     FROM
//       staff
//   `
//   const whereEmail = `WHERE email = ?`

//   let queryCondition = query
//   if(email !== null) {queryCondition += whereEmail}
//   if(limit !== null) {queryCondition += `LIMIT ${limit}`} // Can't use prepare statement
  
//   try {
//     const [results] = await pool.query(
//       queryCondition
//     , condition)

//     return results

//   } catch (error) {
//     console.error(error)
//   }
// }

const insert = async ({
  firstname=null,
  lastname=null,
  email=null,
  tel=null,
  addressTitle=null,
  address=null,
  lat=null,
  lng=null,
  markerType=null}={}) => {

  try {
    const [results] = await pool.query(`
      INSERT INTO staff (
        firstname,
        lastname,
        email,
        tel,
        address_title,
        address,
        lat,
        lng,
        marker_type
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [ firstname, lastname, email, tel, addressTitle, address, lat, lng, markerType])

    return results

  } catch (error) {
    console.error(error)
  }
}

const remove = async ({id=null}={}) => {	
	let queryCondition = 'DELETE FROM staff'
	if(id) {
		queryCondition += ` WHERE staff.staff_id = ${id}`
  }

  try {
    const [results] = await pool.query(
      queryCondition
    )
  
    return results 
  } catch(error) {
    console.error(error)  
  }
}

module.exports = {
  get,
  insert,
  remove
}
