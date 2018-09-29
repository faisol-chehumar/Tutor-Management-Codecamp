const Router = require('koa-router')
const auth = require('../../../../service/auth')
const repo = require('../../../../repository')

const router = new Router()

router.get('/',getCourses)
router.post('/',insertCourses)
module.exports = router.routes()

async function getCourses(ctx){
    const coursesResult = repo.courses.get()
    ctx.body = {result : coursesResult}
}

async function insertCourses(ctx){
    const {title,description,start_date,end_date,course_location_id} = ctx.request.body
    const addResult = await repo.courses.insert(title,description,start_date,end_date,course_location_id)
    ctx.body = {result : addResult}
}