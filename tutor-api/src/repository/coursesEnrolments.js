const pool = require('../db')

const get = async () => {
	console.log("get courses_enrolments")
	try {
		const result = await pool.query(`
        SELECT 
        course_enrolment_id AS courseEnrolmentId,
        course_id AS courseId,
        customer_id AS customerId
        FROM courses_enrolments
        `)
		return result[0]
	} catch (err) {
		console.log(err.message)
		return undefined
	}
}

const getByCourseId = async (courseId) => {

	try {
		const result = await pool.query(`
        SELECT         
        course_enrolment_id AS courseEnrolmentId,
        course_id AS courseId,
        customer_id AS customerId
        FROM courses_enrolments
        WHERE  course_id = ?
        `, [courseId])
		return result[0]
	} catch (err) {
		console.log(err.message)
		return undefined
	}
}

const insert = async ({
	courseId=null,
	customerId=null
}={}) => {

  try {
    const [results] = await pool.query(`
      INSERT INTO courses_enrolments (
        course_id,
        customer_id
      ) VALUES (?, ?)
    `, [ courseId, customerId ])

    return results

  } catch (error) {
    console.error(error)
  }
}

const remove = async ({
	id = null
} = {}) => {
	let queryCondition = 'DELETE FROM courses_enrolments'
	if (id) {
		queryCondition += ` WHERE courses_enrolments.course_id = ${id}`
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
	getByCourseId,
	insert,
	remove
}