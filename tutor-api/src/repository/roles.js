const pool = require('../db')

async function get() {
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

  module.exports = {
    get
  }