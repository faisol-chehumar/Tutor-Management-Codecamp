const Router = require('koa-router')
const auth = require('../../../../service/auth')
const repo = require('../../../../repository')

const router = new Router()

router.get('/',getLocation)
router.post('/',insertLocation)
router.get('/:id',getLocationId)
module.exports = router.routes()

async function getLocation(ctx){   
    console.log('sdsd')
    const locationResult = await repo.location.get()
    ctx.body = {result : locationResult}
}

async function getLocationId(ctx){   
    console.log('test')
    console.log('ctx.param>>', ctx.params.id)
    const locationId = await repo.location.getLocationId(ctx.params.id)
    ctx.body = {result : locationId}
}

// async function findLocation(ctx){
//     console.log('ctx.param>>', ctx.query.id);
//     const locationId = await repo.location.get(ctx.query.id)
//     ctx.body = {result : locationId }
// }

async function insertLocation(ctx){
    const {title,tel,contact,room_size,note,map_marker_id} = ctx.request.body
    const addResult = await repo.location.insert(title,tel,contact,room_size,note,map_marker_id)
    ctx.body = {result : addResult}
}


