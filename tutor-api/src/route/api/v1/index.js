// api/v1/index.js
const Router = require('koa-router')
const router = new Router()

router.use('/staff', require('./staff'))

module.exports = router.routes()
