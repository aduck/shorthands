const model = require('../model')
const Router = require('koa-router')
const ObjectId = require('mongodb').ObjectId
const router = new Router()

router.get('/', async ctx => {
  let q = ctx.query
  ctx.body = await model.query(q)
})
router.post('/', async ctx => {
  let body = ctx.request.body
  let params = {
    content: body.content,
    type: body.type,
    tags: body.tags || [],
    by: 'test', // todo，先写死等做完权限
    at: new Date(),
    status: 0,
    summary: body.summary || ''
  }
  ctx.body = await model.add(params)
})
router.del('/:id', async ctx => {
  let id = ctx.params.id
  ctx.body = await model.dropById(new ObjectId(id))
})

module.exports = router