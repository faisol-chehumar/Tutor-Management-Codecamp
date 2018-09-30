const Router = require('koa-router')
const { staffService } = require('../../../../service')
const Joi = require('joi')

const router = new Router()

router
  .get('/', getAllStaff)
  .get('/:id', getStaffById)
  .post('/', addStaff)
  .delete('/', deleteAllStaff)
  .delete('/:id', deleteStaffById)

async function getAllStaff(ctx) {
  const results =  await staffService.list({
    offset: ctx.query.offset, 
    limit: ctx.query.limit
  })
  
  if(!results) {
    return ctx.throw()
  }

  if(results.length <= 0) {
    ctx.status = 404
    ctx.body = {error: 'Staff list not found'}
    return
  }

  ctx.body = results
}

async function getStaffById(ctx) {
  const result = (await staffService.list()).filter(staff => staff.staffId == ctx.params.id)

  if(!result) {
    return ctx.throw()
  }
  
  if(result.length <= 0) {
    ctx.status = 404
    ctx.body = {error: 'Staff not found'}
    return
  }

  ctx.body = result
}

async function addStaff(ctx) {
  const staffSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    tel: Joi.required(),
    mapMarkerId: Joi.required(),
    roleId: Joi.number().min(1).max(2).required(),
    mandayRate: Joi.required()
  })
  
  try {
    await staffSchema.validate(ctx.request.body)
  } catch(error) {
    ctx.status = 400
    ctx.body = error
  }
  
  const newStaffId = await staffService.create(ctx.request.body)
    
  if(!newStaffId) {
    return ctx.throw()
  }

  ctx.status = 201
  ctx.body = {
    newStaffId
  }
}

async function deleteAllStaff(ctx) {
  await staffService.remove()
  ctx.status = 204
}

async function deleteStaffById(ctx) {
  await staffService.remove({id: ctx.params.id})
  ctx.status = 204
}

module.exports = router.routes()