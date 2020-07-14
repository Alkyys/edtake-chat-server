const koa = require('koa')
const koaRouter = require('koa-router')

// Variable d'environemment
require('dotenv').config()

const app = new koa()
const router = new koaRouter()

// capture des erreurs 
app.use( async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    console.log(err.status)
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
})

router.get('koala', '/', (ctx) => {
  ctx.status = 200
  ctx.body   = "Hello Word 🖐"
})

app.use(router.routes())
  .use(router.allowedMethods())

app.listen(process.env.PORT, () => console.log(`🚀 running on port ${process.env.PORT}`))