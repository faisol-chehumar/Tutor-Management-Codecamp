const Router = require('koa-router')
const repo = require('../../../../repository')

const router = new Router()

router.get('/',getLocation)
router.post('/',addLocation)
router.get('/:id',getLocationId)
module.exports = router.routes()

async function getLocation(ctx){   
    console.log('getLocation--->')
    const locationResult = await repo.location.get()
    ctx.body = {result : locationResult}
}

async function getLocationId(ctx){   
    console.log('getLocationId--->')
    console.log('ctx.param>>', ctx.params.id)
    const locationId = await repo.location.getLocationId(ctx.params.id)
    ctx.body = {result : locationId}
}

// async function findLocation(ctx){
//     console.log('ctx.param>>', ctx.query.id);
//     const locationId = await repo.location.get(ctx.query.id)
//     ctx.body = {result : locationId }
// }

async function addLocation(ctx){
    // console.log("addLocation---->",ctx.request.body)
    // const {tel, contact, roomSize, note,addressTitle,address,lat,lng,MarkerType} = ctx.request.body
    // const addResult = await repo.location.insert(tel, contact, roomSize, note,addressTitle,address,lat,lng,MarkerType)
    const {tel,contact,room_size,note,address_title,address,lat,lng,marker_type} = ctx.request.body
  console.log('insertLocation------>>>>')
  const addResult = await repo.location.insert(tel, contact, room_size, note,address_title,address,lat,lng, marker_type)
    ctx.body = {result : addResult}
}


