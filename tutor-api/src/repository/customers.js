const pool = require('../db')

const get = async ({
  offset = null,
  limit = null
  }={}) => {
  const condition = [offset, limit].filter(elm => elm !== null)
  const query = `
    SELECT
      customer_id AS customerId,
      firstname,
      lastname,
      email,
      tel,
      actived_status AS activedStatus,
      child_age AS childAge,
      address_title AS addressTitle,
      lat,
      lng,
      image_path AS imagePath
    FROM
      customers
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
//       customer_id AS customerId,
//       firstname,
//       lastname,
//       email,
//       tel,
//       actived_status AS activedStatus,
//       child_age AS childAge,
//       address_title AS addressTitle,
//       lat,
//       lng,
//       image_path AS imagePath
//     FROM
//       customers
//   `
//   const whereId = `WHERE Customer_id = ?`

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

const getById = async (customerId) => {
  try {
    const result = await pool.query(`
      SELECT         
        customer_id AS customerId,
        firstname,
        lastname,
        email,
        tel,
        actived_status AS activedStatus,
        child_age AS childAge,
        address_title AS addressTitle,
        lat,
        lng,
        image_path AS imagePath
      FROM customers
      WHERE  customer_id = ?
      `, [customerId])
    return result[0]
  } catch (err) {
    console.log(err.message)
    return
  }
}

// const getByEmail = async ({
//   email = null,
//   offset = null,
//   limit = null
//   }={}) => {
//   const condition = [email, offset, limit].filter(elm => elm !== null)
//   const query = `
//     SELECT
//       Customer_id AS CustomerId,
//       firstname,
//       lastname,
//       email,
//       tel,
//       map_marker_id AS mapMarkerId
//     FROM
//       Customer
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
  activedStatus=null,
  childAge=null,
  addressTitle=null,
  lat=null,
  lng=null,
  imagePath=null
}={}) => {

  try {
    const [results] = await pool.query(`
      INSERT INTO customers (
        firstname,
        lastname,
        email,
        tel,
        actived_status,
        child_age,
        address_title,
        lat,
        lng,
        image_path
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [ firstname, lastname, email, tel, activedStatus, childAge, addressTitle, lat, lng, imagePath])

    return results

  } catch (error) {
    console.error(error)
  }
}

const remove = async ({id=null}={}) => {	
	let queryCondition = 'DELETE FROM customers'
	if(id) {
		queryCondition += ` WHERE customers.customer_id = ${id}`
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
  getById,
  insert,
  remove
}
