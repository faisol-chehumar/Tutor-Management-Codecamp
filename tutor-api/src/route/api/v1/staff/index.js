const Router = require('koa-router')
const auth = require('../../../../service/auth')
const repo = require('../../../../repository')

const router = new Router()

router.get('/findAll', findAll)
router.get('/role', findRole)
module.exports = router.routes()

async function findAll (ctx){
    const roleResult =  await repo.role.findAll()
    ctx.body = { result: roleResult }
  }
async function findRole (ctx){
    console.log('ctx.param>>', ctx.query);
    
    const roleId =  await repo.role.getRoleId(1)
    ctx.body = { id: roleId }
  }