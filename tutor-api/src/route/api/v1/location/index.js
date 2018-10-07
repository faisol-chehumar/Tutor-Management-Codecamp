const Router = require('koa-router')
const { locationService } = require('../../../../service')
const Joi = require('joi')

const router = new Router()
/**
 * @swagger
 * resourcePath: /locations
 */
/**
 * @swagger
 * path: /api/v1/locations/
 * operations:
 *   -  httpMethod: GET
 *      summary: Get All location
 *      nickname: locations
 */
router
  .get('/', getAlllocations)
/**
 * @swagger
 * path: /api/v1/locations/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get location By id
 *      nickname: locations
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - in: path
 *          name: id
 *          description: location id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
  .get('/:id', getlocationsById)
  .post('/', addlocations)
  // .delete('/', deleteAlllocations)

  /**
 * @swagger
 * path: /api/v1/locations/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete location By id
 *      nickname: locations
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - in: path
 *          name: id
 *          description: location id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
  .delete('/:id', deletelocationsById)

async function getAlllocations(ctx) {
  const results =  await locationService.list({
    offset: ctx.query.offset, 
    limit: ctx.query.limit
  })
  
  if(!results) {
    return ctx.throw()
  }

  if(results.length <= 0) {
    ctx.status = 404
    ctx.body = {error: 'locations list not found'}
    return
  }

  ctx.body = results
}

async function getlocationsById(ctx) {
  const result = (await locationService.list()).filter(locations => locations.locationId == ctx.params.id)

  if(!result) {
    return ctx.throw()
  }
  
  if(result.length <= 0) {
    ctx.status = 404
    ctx.body = {error: 'locations not found'}
    return
  }

  ctx.body = result
}

async function addlocations(ctx) {
  const locationsSchema = Joi.object().keys({
    contact: Joi.required(),
    roomSize: Joi.required(),
    note: Joi.required(),
    tel: Joi.required(),
    addressTitle: Joi.required(),
    address: Joi.required(),
    lat: Joi.required(),
    lng: Joi.Required(),
    markerType: Joi.required()
  })

  try {
    await locationsSchema.validate(ctx.request.body)
  } catch(error) {
    ctx.status = 400
    ctx.body = error
  }
  
  const newlocationsId = await locationService.create(ctx.request.body)
    
  if(!newlocationsId) {
    return ctx.throw()
  }

  ctx.status = 201
  ctx.body = {
    newlocationsId
  }
}

// async function deleteAlllocations(ctx) {
//   await locationService.remove()
//   ctx.status = 204
// }
async function deletelocationsById(ctx) {
  await locationService.remove({id: ctx.params.id})
  ctx.status = 204
}

module.exports = router.routes()