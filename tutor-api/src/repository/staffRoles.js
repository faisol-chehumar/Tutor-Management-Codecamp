const pool = require('../db')

const get = async () => {
	const [results] = await pool.query(`
		SELECT
			staff_id AS staffId,
			role_id AS roleId,
			manday_rate AS mandayRate
		FROM
			staff_roles
	`)

	return results
}

const insert = async ({staffId=null, roleId=null, mandayRate=null}={}) => {
	const [results] = await pool.query(`
		INSERT INTO staff_roles (
			staff_id,
			role_id,
			manday_rate
		) VALUES (?, ?, ?)
	`, [ staffId, roleId, mandayRate ])

	return results
}

const remove = async ({id=null}={}) => {
	console.log('Hello')
	let queryCondition = 'DELETE FROM staff_roles'
	if(id) {
		queryCondition += ` WHERE staff_roles.staff_id = ${id}`
	}	

	const [results] = await pool.query(
		queryCondition
	)

	return results
}

module.exports = {
	get,
	insert,
  remove
}
