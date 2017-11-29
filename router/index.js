const Router = require('koa-router')
const router = new Router()
const shorthands = require('./shorthands')

router.get('/', async ctx => {
  ctx.body = 'hello world'
})
router.use('/api/shorthand', shorthands.routes())
module.exports = router