const pool = require('../db')

const findAll = async () => {
	const [results] = await pool.query(`
		SELECT
			staff_id AS staffId,
			role_id AS roleId,
			manday_rate AS mandayRate
		FROM
			staff_roles;
	`)

	return results
}

const insert = async (staffId, roleId, mandayRate) => {
	const [results] = await pool.query(`
		INSERT INTO staff_roles (
			staff_id,
			role_id,
			manday_rate
		) VALUES (?, ?, ?)
	`, [ staffId, roleId, mandayRate ])

	return results
}

const remove = async () => {
	const [results] = await pool.query(`
    DELETE FROM staff_roles
	`)

	return results
}

module.exports = {
	findAll,
	insert,
  remove
}
