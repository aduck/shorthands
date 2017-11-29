const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const bodyParser = require('koa-bodyparser')

// 中间件
app.use(bodyParser())
// 配置路由
app.use(router.routes())
// 错误处理
app.on('error', (err, ctx) => {
  ctx.body = err
})
module.exports = app