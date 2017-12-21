const model = require('../model/user')
const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const {KEY} = require('../config')
const router = new Router()
// 登录
router.post('/', async ctx => {
  let body = ctx.request.body
  let params = {
    username: body.username,
    pwd: body.pwd
  }
  let user = await model.query(params)
  if (!user.code) {
    ctx.body = jwt.sign({
      username: user.data.username,
      nickname: user.data.nickname
    }, KEY)
    return
  }
  ctx.body = user
})

module.exports = router