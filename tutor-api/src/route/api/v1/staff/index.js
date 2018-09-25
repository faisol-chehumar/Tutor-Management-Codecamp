const Router = require('koa-router')
const { staffService } = require('../../../../service')

const router = new Router()

router
  .get('/', getStaffList)
  .post('/', createStaff)
  // .put('/', updateStaffList)
  .delete('/', removeStaffList)

async function getStaffList(ctx) {
  const staffList =  await staffService.list()

  if(!staffList) {
    return ctx.throw()
  }

  ctx.body = staffList
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