// api/v1/index.js
const Router = require('koa-router')
const router = new Router()


router.use('/staff', require('./staff'))
//router.use('/customer', require('./customer'))
router.use('/locations',require('./location'))
router.use('/courses',require('./course'))


module.exports = router.routes()
