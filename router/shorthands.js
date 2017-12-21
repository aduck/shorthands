const model = require('../model/shorthands')
const Router = require('koa-router')
const {ObjectId} = require('mongodb')
const router = new Router()

router.get('/', async ctx => {
  let q = ctx.query
  if (ctx.user.username !== 'admin') q.by = ctx.user.nickname
  ctx.body = await model.query(q)
})
router.post('/', async ctx => {
  let body = ctx.request.body
  let params = {
    content: body.content,
    type: body.type,
    tags: body.tags || [],
    by: ctx.user.nickname,
    at: new Date(),
    status: 0,
    summary: body.summary || ''
  }
  ctx.body = await model.add(params)
})
router.del('/:id', async ctx => {
  if (ctx.user.username !== 'admin') {
    ctx.body = {
      code: -1,
      message: '你真不是管理员'
    }
    return
  }
  let id = ctx.params.id
  ctx.body = await model.dropById(new ObjectId(id))
})

module.exports = router