const path = require('path')
const Koa = require('koa')
const koaBody = require('koa-body')
const serve = require('koa-static')
const session = require('koa-session')
const cors = require('@koa/cors')

const app = new Koa()
app.keys = ['supersecret']

const sessionStore = {}
const sessionConfig = {
  key: 'tutor:sess',
  maxAge: 1000 * 60 * 60 * 7,
  httpOnly: true,
  store: {
    get (key, maxAge, { rolling }) {
      return sessionStore[key]
    },
    set (key, sess, maxAge, { rolling }) {
      sessionStore[key] = sess
    },
    destroy (key) {
      delete sessionStore[key]
    }
  }
}

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
  .use(session(sessionConfig, app))
  .use(koaBody({ multipart: true }))
  .use(handleError)
  .use(require('./route'))

  .listen(8000)
