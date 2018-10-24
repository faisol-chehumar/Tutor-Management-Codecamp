const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const swagger = require('swagger-koa')
const serve = require('koa-static')
const path = require('path')
const app = new Koa()
const port = 8000


// throwAppError checks app error and return error message to client
app.context.throwAppError = function (err) {
  if (err && err.name === 'AppError') {
    this.status = err.status
    this.body = { error: err.message }
    return
  }
  console.error(err.message)
  this.throw()
}

const handleError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.throwAppError(err)
  }
}

app
.use(swagger.init({
  apiVersion: '1.0',
  swaggerVersion: '1.0',
  basePath: 'http://localhost:' + port,
  swaggerURL: '/swagger',
  swaggerJSON: '/api-docs.json',
  swaggerUI: './public/swagger/',
  apis: ['./src/route/api/v1/staff/index.js',
         './src/route/api/v1/location/index.js',
         './src/route/api/v1/customer/index.js',
         './src/route/api/v1/course/index.js',
         './src/route/api/v1/calendar/index.js']
}))
  .use(serve(path.join(__dirname, 'public')))
  .use(cors({ credentials: true }))
  .use(koaBody({ multipart: true }))
  .use(handleError)
  .use(require('./route'))
  .listen(port)
  
