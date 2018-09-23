const Router = require('koa-router')
const {role, staff} = require('../../../../repository')

const router = new Router()

router.get('/', getStaff)
router.post('/', insertStaff)

// router.get('/role', findRole)

module.exports = router.routes()

async function getStaff(ctx) {
  const staffList =  await staff.get()
  ctx.body = { result: staffList }
}

async function insertStaff(ctx) {
  const {firstname, lastname, email, tel, mapMarkerId} = ctx.request.body
  const addResult = await staff.insert(firstname, lastname, email, tel, mapMarkerId)
  ctx.body = { result: addResult }
}

// async function findRole(ctx) {
//   console.log('ctx.param>>', ctx.query);
  
//   const roleId =  await role.getRoleId(1)
//   ctx.body = { id: roleId }
// }