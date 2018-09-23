const Router = require('koa-router')
const auth = require('../../../../service/auth')
const repo = require('../../../../repository')

const router = new Router()

router.get('/',findAll)
router.get('/location',findLocation)
module.exports = router.routes()


async function findAll(ctx){
    const locationResult = await repo.location.findAll()
    ctx.body = {result : locationResult}
}

async function findLocation(ctx){
    console.log('ctx.param>>', ctx.query.id);
    const locationId = await repo.location.getLocationId(ctx.query.id)
    ctx.body = {result : locationId }
}



