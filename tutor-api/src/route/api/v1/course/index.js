const Router = require('koa-router')
const { courseService } = require('../../../../service')
const Joi = require('joi')

const router = new Router()

router

/**
 * @swagger
 * resourcePath: /courses
 */
/**
 * @swagger
 * path: /api/v1/courses/
 * operations:
 *   -  httpMethod: GET
 *      summary: Get All course
 *      nickname: courses
 */
  .get('/', getAllCourse)
  /**
 * @swagger
 * path: /api/v1/courses/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get course By id
 *      nickname: courses
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - in: path
 *          name: id
 *          description: course id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
  .get('/:id', getCourseById)
  .post('/', addCourse)
  // .delete('/', deleteAllCourse)

  /**
 * @swagger
 * path: /api/v1/courses/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: delete course By id
 *      nickname: courses
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - in: path
 *          name: id
 *          description: course id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
  .delete('/:id', deleteCourseById)

async function getAllCourse(ctx) {
  const results =  await courseService.list({
    offset: ctx.query.offset, 
    limit: ctx.query.limit
  })
  
  if(!results) {
    return ctx.throw()
  }

  if(results.length <= 0) {
    ctx.status = 404
    ctx.body = {error: 'Course list not found'}
    return
  }

  ctx.body = results
}

async function getCourseById(ctx) {
  const result = (await courseService.list()).filter(Course => Course.courseId == ctx.params.id)

  if(!result) {
    return ctx.throw()
  }
  
  if(result.length <= 0) {
    ctx.status = 404
    ctx.body = {error: 'Course not found'}
    return
  }

  ctx.body = result
}

async function addCourse(ctx) {
  // console.log('Post new course')

  const CourseSchema = Joi.object().keys({
    locationId: Joi.number().required(),
    title: Joi.string().required(),
    description: Joi.string(),
    startDate: Joi.date(),
    endtDate: Joi.date(),
    imagePath: Joi.string()
  })
  
  try {
    await CourseSchema.validate(ctx.request.body)
  } catch(error) {
    ctx.status = 400
    ctx.body = error
  }
  
  console.log(ctx.request.body)
  const newCourseId = await courseService.create(ctx.request.body)
    
  if(!newCourseId) {
    return ctx.throw()
  }

  ctx.status = 201
  ctx.body = {
    newCourseId
  }
}

// async function deleteAllCourse(ctx) {
//   await courseService.remove()
//   ctx.status = 204
// }

async function deleteCourseById(ctx) {
  await courseService.remove({id: ctx.params.id})
  ctx.status = 204
}

module.exports = router.routes()