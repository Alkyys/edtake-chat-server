const koa = require('koa')
const koaRouter = require('koa-router')

const errorHandler = require('./middleware/error.middleware');

// Variable d'environemment
require('dotenv').config()

const app = new koa()
const router = new koaRouter()

app
  // capture des erreurs 
  .use(errorHandler)

router.get('koala', '/', (ctx) => {
  ctx.status = 200
  ctx.body = "Hello Word 🖐"
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(process.env.PORT, () => console.log(`🚀 running on port ${process.env.PORT}`))