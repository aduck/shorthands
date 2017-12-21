const Router = require('koa-router')
const router = new Router()
const shorthands = require('./shorthands')
const token = require('./token')
const checkLogin = require('../middle/check')

router.get('/', async ctx => {
  ctx.body = 'hello world'
})
router.use('/token', token.routes())
router.use('/api/shorthand', checkLogin, shorthands.routes())
module.exports = router