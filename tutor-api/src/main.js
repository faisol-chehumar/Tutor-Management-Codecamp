
const Koa = require('koa')
const koaBody = require('koa-body')
const session = require('koa-session')
const cors = require('@koa/cors')

const app = new Koa()


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
  .use(cors({ credentials: true }))
  .use(koaBody({ multipart: true }))
  .use(handleError)
  .use(require('./route'))

  .listen(8000)
