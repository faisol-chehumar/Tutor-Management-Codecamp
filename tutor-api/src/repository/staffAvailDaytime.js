const pool = require('../db')

const get = async () => {
	const [results] = await pool.query(`
		SELECT
			staff_id AS staffId,
            weekday_num AS weekdayNum,
            time_code AS timeCode,
            status_code AS statusCode
		FROM
        staff_avail_daytime
	`)

	return results
}

const insert = async ({staffId=null, weekdayNum=null, timeCode=null, statusCode='A'}={}) => {
	const [results] = await pool.query(`
		INSERT INTO staff_avail_daytime (
			staff_id,
            weekday_num,
            time_code,
            status_code
		) VALUES (?, ?, ?, ?)
	`, [ staffId, weekdayNum, timeCode, statusCode])
	return results
}

const remove = async ({id=null}={}) => {
	console.log('staff_avail_daytime')
	let queryCondition = 'DELETE FROM staff_avail_daytime'
	if(id) {
		queryCondition += ` WHERE staff_avail_daytime.staff_id = ${id}`
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
