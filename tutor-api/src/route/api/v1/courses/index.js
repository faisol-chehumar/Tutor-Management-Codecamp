const Router = require('koa-router')
const repo = require('../../../../repository')

const router = new Router()

router.get('/',getCourse)
router.get('/:id',getCourseById)
router.post('/',insertCourse)

module.exports = router.routes()

async function getCourse(ctx){
    const coursesResult = await repo.course.get()
    ctx.body = coursesResult
}
async function getCourseById(ctx) {
    console.log('ctx.params.getCourseById >>', ctx.params.id)
    const coursesId = await repo.course.getCourseById(ctx.params.id)
    ctx.body = coursesId
}

async function insertCourse(ctx){
    const {title,description,start_date,end_date,course_location_id} = ctx.request.body
    const addResult = await repo.courses.insert(title,description,start_date,end_date,course_location_id)
    ctx.body = {result : addResult}
}