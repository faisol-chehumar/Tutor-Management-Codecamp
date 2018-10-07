// api/v1/index.js
const Router = require('koa-router')
const router = new Router()


router.use('/staff', require('./staff'))
router.use('/customers', require('./customers'))
router.use('/locations',require('./location'))
router.use('/courses',require('./courses'))


module.exports = router.routes()
