const Router = require('koa-router')
const auth = require('../../../../service/auth')
const repo = require('../../../../repository')

const router = new Router()

router.get('/',findAll)
router.get('/location',findLocation)
router.post('/',insertLocation)
module.exports = route

async function findAll(ctx){
    const locationResult = await repo.location.findAll()
    ctx.body = {result : locationResult}
}

async function findLocation(ctx){
    console.log('ctx.param>>', ctx.query.id);
    const locationId = await repo.location.getLocationId(ctx.query.id)
    ctx.body = {result : locationId }
}

async function insertLocation(ctx){
    const {title,tel,contact,room_size,note,map_marker_id} = ctx.request.body
    const addResult = await locations.insert(title,tel,contact,room_size,note,map_marker_id)
    ctx.body = {result : addResult}
}


