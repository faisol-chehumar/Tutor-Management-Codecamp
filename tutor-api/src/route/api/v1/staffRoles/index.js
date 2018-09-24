const Router = require('koa-router')
const { staffRoles } = require('../../../../repository')

const router = new Router()

// router.get('/', getstaffRoles)
router.post('/', insertstaffRoles)

// async function getstaffRoles(ctx) {
//   const staffList = await staff.get()
//   ctx.body = { result: staffList }
// }

async function insertstaffRoles(ctx) {
  const {staffId, roleId, mandayRate} = ctx.request.body
  const insertResult = await staffRoles.insert(staffId, roleId, mandayRate)
  ctx.body = { result: insertResult }
}

module.exports = router.routes()