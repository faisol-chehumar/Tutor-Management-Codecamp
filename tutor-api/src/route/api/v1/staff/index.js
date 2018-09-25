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

  if(staffList.length <= 0) {
    return {}
  }

  ctx.body = staffList
}

async function createStaff(ctx) {
  const { firstname, lastname, email, tel, mapMarkerId, role, mandayRate } = ctx.request.body
  const newStaff = await staffService.create(firstname, lastname, email, tel, mapMarkerId, role, mandayRate)

  if(!newStaff) {
    return ctx.throw()
  }

  ctx.status = 201
  ctx.body = newStaff
}

async function removeStaffList(ctx) {
  const removeResult =  await staffService.remove()
  ctx.body = removeResult
}

module.exports = router.routes()