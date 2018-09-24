const Router = require('koa-router')
// const { staff } = require('../../../../repository')
const { staff } = require('../../../../service')

const router = new Router()

router.get('/', getStaff)
// router.post('/', insertStaff)

async function getStaff(ctx) {
  const staffList =  await staff.getStaffDetail()
  // console.log()
  ctx.body = { result: staffList }
}

// async function insertStaff(ctx) {
//   const {firstname, lastname, email, tel, mapMarkerId} = ctx.request.body
//   const addResult = await staff.insert(firstname, lastname, email, tel, mapMarkerId)
//   ctx.body = { result: addResult }
// }

module.exports = router.routes()