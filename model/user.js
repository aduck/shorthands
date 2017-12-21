const dbUtil = require('./common')
const collectionName = 'users'
// 新增
const add = async user => {
  let db = await dbUtil.connect()
  let collection = db.collection(collectionName)
  try {
    // 传入数据校验
    let msg = dbUtil.checkRecord(user, {
      username: 'required',
      pwd: '6:20',
      nick: 'required'
    })
    if (msg) {
      throw msg
      return
    }
    await collection.insertOne(user)
    return dbUtil.handleDBSuccess(user, db)
  } catch (e) {
    return dbUtil.handleDBError(e, db)
  }
}
// 查找
const query = async user => {
  let db = await dbUtil.connect()
  let collection = db.collection(collectionName)
  try {
    let result = await collection.findOne(user)
    if (!result) {
      throw new Error('用户名或密码错误')
      return
    }
    return dbUtil.handleDBSuccess(result, db)
  } catch (e) {
    return dbUtil.handleDBError(e, db)
  }
}
// 删除
const del = async username => {
  let db = await dbUtil.connect()
  let collection = db.collection(collectionName)
  try {
    let result = await collection.findOneAndDelete({username})
    return dbUtil.handleDBSuccess('删除成功', db)
  } catch (e) {
    return dbUtil.handleDBError(e, db)
  }
}
module.exports = {
  add,
  query,
  del
}