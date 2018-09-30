const Router = require('koa-router')
const repo = require('../../../../repository')

const router = new Router()

router.get('/',getCourse)
router.get('/:id',getCourseId)
router.post('/',insertCourse)

module.exports = router.routes()

async function getCourse(ctx){
    const coursesResult = await repo.course.get()
    ctx.body = {result : coursesResult}
}
async function getCourseId(ctx) {
    console.log('ctx.params.getCourseId >>', ctx.params.id)
    const coursesId = await repo.course.getCourseId(ctx.params.id)
    ctx.body = {result : coursesId}
}

async function insertCourse(ctx){
    const {title,description,start_date,end_date,course_location_id} = ctx.request.body
    const addResult = await repo.courses.insert(title,description,start_date,end_date,course_location_id)
    ctx.body = {result : addResult}
}