const jwt = require('jsonwebtoken')
const {KEY} = require('../config')

module.exports = async (ctx, next) => {
  let header = ctx.request.header
  let auth = header.authorization
  try {
    if (auth && auth.split(' ')[0] === 'bearer') {
      let user = jwt.verify(auth.split(' ')[1], KEY)
      ctx.user = user
      await next()
      return
    }
    throw new Error('未登录')
  } catch (e) {
    // todo这里要做跳转
    ctx.status = 401
  }
}