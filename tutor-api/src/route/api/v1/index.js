// api/v1/index.js
const Router = require('koa-router')
const router = new Router()


router.use('/staff', require('./staff'))
router.use('/customers', require('./customer'))
router.use('/locations',require('./location'))
router.use('/courses',require('./course'))
router.use('/email',require('./email'))

module.exports = router.routes()
