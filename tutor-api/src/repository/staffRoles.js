const pool = require('../db')

const findAll = async () => {
	const [result] = await pool.query(`
		SELECT
			staff_id AS staffId,
			role_id AS roleId,
			manday_rate AS mandayRate
		FROM
			staff_roles;
	`)

	return result
}

const insert = async (staffId, roleId, mandayRate) => {
	const [result] = await pool.query(`
		INSERT INTO staff_roles (
			staff_id,
			role_id,
			manday_rate
		) VALUES (?, ?, ?)
	`, [ staffId, roleId, mandayRate ])

	return result
}

const remove = async () => {
	const [result] = await pool.query(`
    DELETE FROM staff_roles
	`)

	return result
}

module.exports = {
	findAll,
	insert,
  remove
}
