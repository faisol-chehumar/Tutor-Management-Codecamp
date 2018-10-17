const pool = require('../db')

const get = async () => {
	console.log("get staff_registrations")
	try {
		const result = await pool.query(`
        SELECT 
					staff_registration_id AS staffRegistrationId,
					staff_id AS staffId,
					course_id AS courseId,
					role_id AS roleId
        FROM staff_registrations
        `)
		return result[0]
	} catch (err) {
		console.log(err.message)
		return undefined
	}
}

const getByStaffId = async (staffId) => {

	try {
		const result = await pool.query(`
        SELECT 
					staff_registration_id AS staffRegistrationId,
					staff_id AS staffId,
					course_id AS courseId,
					role_id AS roleId
					FROM staff_registrations
        WHERE  staff_id = ?
        `, [staffId])
		return result[0]
	} catch (err) {
		console.log(err.message)
		return undefined
	}
}

const insert = async (staffId, courseId, roleId) => {
	try {
		const result = await pool.query(`
        INSERT INTO staff_registrations
        	(staff_id,course_id,role_id)
        VALUES
        	(?,?,?)
        ` [staffId, courseId, roleId])
		return result
	} catch (err) {
		console.log(err.message)
		return undefined
	}

}
const removeByStaffId = async ({
	id = null
} = {}) => {
	let queryCondition = 'DELETE FROM staff_registrations'
	if (id) {
		queryCondition += ` WHERE staff_registrations.staff_id = ${id}`
	}

	try {
		const [results] = await pool.query(
			queryCondition
		)

		return results
	} catch (error) {
		console.error(error)
	}
}
module.exports = {
	get,
	getByStaffId,
	insert,
	removeByStaffId
}