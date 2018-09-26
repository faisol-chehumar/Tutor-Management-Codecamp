const Router = require('koa-router')

const { staffService } = require('../../../../service')

const router = new Router()

router
  .get('/', getStaffList)
  .get('/:id', getStaffById)
  .post('/', createStaff)
  // .put('/', updateStaffList)
  .delete('/', removeStaffList)

async function getStaffList(ctx) {
  const staffList =  await staffService.list()
  
  if(!staffList) {
    return ctx.throw()
  }

  if(staffList.length <= 0) {
    return {}
  }

  ctx.body = staffList
}

async function getStaffById(ctx) {
  const staffData = await staffService.list(ctx.params.id)
  
  if(!staffData) {
    return ctx.throw()
  }

  if(staffData.length <= 0) {
    return {}
  }

  ctx.body = staffData
}

async function createStaff(ctx) {
  const { firstname, lastname, email, tel, mapMarkerId, role, mandayRate } = ctx.request.body
  const newStaffId = await staffService.create(firstname, lastname, email, tel, mapMarkerId, role, mandayRate)

  if(!newStaffId) {
    return ctx.throw()
  }

  ctx.status = 201
  ctx.body = {
    newStaffId
  }
}

async function removeStaffList(ctx) {
  await staffService.remove()
  ctx.status = 204
}

module.exports = router.routes()