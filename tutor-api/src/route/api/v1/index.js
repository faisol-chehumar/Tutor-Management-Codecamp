// api/v1/index.js
const Router = require('koa-router')

const router = new Router()
console.log('1mim');

router.use('/staff', require('./staff'))
router.use('/customer', require('./customer'))
module.exports = router.routes()
