const koa = require('koa')
const logger = require('koa-logger');
const Router = require('koa-router')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser');

const errorHandler = require('./middleware/error.middleware')

// Variable d'environemment
require('dotenv').config()

const server = new koa()

// log all events to the terminal
server.use(logger());

server
  // capture des erreurs
  .use(errorHandler)
  // cross origin
  .use(cors())
  // body parser
  .use(bodyParser())

const router = new Router()
require('./auth')({ router })

server
  .use(router.routes())
  .use(router.allowedMethods());

router.get('koala', '/', (ctx) => {
  ctx.status = 200
  ctx.body = "Hello Word 🖐"
})

server.listen(process.env.PORT, () => console.log(`🚀 running on port ${process.env.PORT}`))