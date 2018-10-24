const Router = require('koa-router')
const { calendarService } = require('../../../../service')

const router = new Router()

router

/**
 * @swagger
 * resourcePath: /calendar
 */
/**
 * @swagger
 * path: /api/v1/calendar/
 * operations:
 *   -  httpMethod: GET
 *      summary: Get All calendar
 *      nickname: calendar
 */
  .get('/', getAllCalendar)

async function getAllCalendar(ctx) {
  const results =  await calendarService.list({
    offset: ctx.query.offset, 
    limit: ctx.query.limit
  })
  
  if(!results) {
    return ctx.throw()
  }

  if(results.length <= 0) {
    ctx.status = 404
    ctx.body = {error: 'Calendar list not found'}
    return
  }

  ctx.body = results
}

module.exports = router.routes()