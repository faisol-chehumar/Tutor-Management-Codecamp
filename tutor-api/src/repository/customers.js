const pool = require('../db')

const get = async ({
  offset = null,
  limit = null
  }={}) => {
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
      address,
      lat,
      lng,
      marker_type AS markerType
    FROM
      customers
  `
  const condition = [offset, limit].filter(elm => elm !== null)
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

const getById = async ({id=null}={}) => {
  
  try {
    const [results] = await pool.query(`
      SELECT
        customer_id AS customerId,
        firstname,
        lastname,
        email,
        tel,
        actived_status AS activedStatus,
        child_age AS childAge,
        address_title AS addressTitle,
        address,
        lat,
        lng,
        marker_type AS markerType
      FROM
        staff
      WHERE customer_id = ?
      `
    , [id])

    return results

  } catch (error) {
    console.error(error)
  }
}

const insert = async ({
  firstname=null,
  lastname=null,
  email=null,
  tel=null,
  activeStatus,
  childAge,
  addressTitle=null,
  address=null,
  lat=null,
  lng=null,
  markerType=null
}={}) => {

  try {
    const [results] = await pool.query(`
      INSERT INTO staff (
        customer_id AS customerId,
        firstname,
        lastname,
        email,
        tel,
        actived_status AS activedStatus,
        child_age AS childAge,
        address_title AS addressTitle,
        address,
        lat,
        lng,
        marker_type AS markerType
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [ firstname, lastname, email, tel, activeStatus, childAge, addressTitle, address, lat, lng, markerType ])

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
