const pool = require('../db')

async function findAll() {
  try {
    const [result] = await pool.query(`
      SELECT
        role_id,
        title
      FROM 
        roles
    `)
    
    return result

  } catch(err) {
    console.log(err.message)
    return
  }
}

async function findById(id) {
  try {
    const [result] = await pool.query(`
      select role_id
      from roles
      where role_id = ?
    `, [id])
    return result[0] && result[0].role_id
  } catch(err) {
  console.log(err.message)
    return undefined;
  }
}

module.exports = {
  findAll,
  findById
}