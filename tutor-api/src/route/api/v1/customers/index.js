const Router = require('koa-router')
const repo = require('../../../../repository')

const router = new Router()

router.get('/',getCustomer)
router.get('/:id',getCustomerId)
router.post('/',insertCustomer)

module.exports = router.routes()

async function getCustomer(ctx){
    const CustomersResult = await repo.customers.get()
    ctx.body = {result : CustomersResult}
}
async function getCustomerId(ctx) {
    console.log('ctx.params.getCustomerId >>', ctx.params.id)
    const CustomersId = await repo.customers.getCustomerId(ctx.params.id)
    ctx.body = {result : CustomersId}
}

async function insertCustomer(ctx){
    const {title,description,start_date,end_date,Customer_location_id} = ctx.request.body
    const addResult = await repo.Customers.insert(title,description,start_date,end_date,Customer_location_id)
    ctx.body = {result : addResult}
}