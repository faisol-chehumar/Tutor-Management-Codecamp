const Router = require('koa-router')
const { customerService } = require('../../../../service')
const Joi = require('joi')

const router = new Router()

router

/**
 * @swagger
 * resourcePath: /customers
 */
/**
 * @swagger
 * path: /api/v1/customers/
 * operations:
 *   -  httpMethod: GET
 *      summary: Get All customer
 *      nickname: customers
 */
  .get('/', getAllCustomer)
  /**
 * @swagger
 * path: /api/v1/customers/{id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get customers By id
 *      nickname: customers
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - in: path
 *          name: id
 *          description: customer id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
  .get('/:id', getCustomerById)
  .post('/', addCustomer)
  // .delete('/', deleteAllCustomer)
  /**
 * @swagger
 * path: /api/v1/customers/{id}
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Delete customers By id
 *      nickname: customers
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - in: path
 *          name: id
 *          description: customer id
 *          paramType: path
 *          required: true
 *          dataType: string
 */
  .delete('/:id', deleteCustomerById)

async function getAllCustomer(ctx) {
  const results =  await customerService.list({
    offset: ctx.query.offset, 
    limit: ctx.query.limit
  })
  
  if(!results) {
    return ctx.throw()
  }

  if(results.length <= 0) {
    ctx.status = 404
    ctx.body = {error: 'Customer list not found'}
    return
  }

  ctx.body = results
}

async function getCustomerById(ctx) {
  const result = (await customerService.list()).filter(customer => customer.customerId == ctx.params.id)

  if(!result) {
    return ctx.throw()
  }
  
  if(result.length <= 0) {
    ctx.status = 404
    ctx.body = {error: 'Customer not found'}
    return
  }

  ctx.body = result
}

async function addCustomer(ctx) {
  const CustomerSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    tel: Joi.string().required(),
    activedStatus :Joi.number().required(),
    childAge:Joi.number().required(),
    addressTitle: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    imagePath: Joi.string().required()
  })
  
  try {
    await CustomerSchema.validate(ctx.request.body)
  } catch(error) {
    ctx.status = 400
    ctx.body = error
  }
  
  const newCustomerId = await customerService.create(ctx.request.body)
    
  if(!newCustomerId) {
    return ctx.throw()
  }

  ctx.status = 201
  ctx.body = {
    newCustomerId
  }
}

// async function deleteAllCustomer(ctx) {
//   await CustomerService.remove()
//   ctx.status = 204
// }

async function deleteCustomerById(ctx) {
  await customerService.remove({id: ctx.params.id})
  ctx.status = 204
}

module.exports = router.routes()