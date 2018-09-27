const pool = require('../db')

async function findAll() {
  try {
    const [results] = await pool.query(`
      SELECT
        role_id AS roleId,
        title
      FROM
        roles
    `)
    
    return results
  
  } catch(err) {
    console.log(err.message)
    return
  }
}

async function findById(id) {
    try {
      const [results] = await pool.query(`
        SELECT
          role_id AS roleId
        FROM
          roles
        WHERE
          role_id = ?
      `, [ id ])
      
      return results[0] && results[0].role_id
    
    } catch(err) {
    console.log(err.message)
      return
    }
  }

  module.exports = {
    findAll,
    findById
  }