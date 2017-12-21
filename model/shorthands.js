const dbUtil = require('./common')
const collectionName = 'shorthands'

// 新增
const add = async record => {
  let db = await dbUtil.connect()
  let collection = db.collection(collectionName)
  try {
    // 传入数据校验
    let errMsg = dbUtil.checkRecord(record, {
      content: 'required',
      type: 'required',
      at: 'required',
      by: 'required'
    })
    if (errMsg) {
      throw new Error(errMsg)
    }
    await collection.insertOne(record)
    return dbUtil.handleDBSuccess(record, db)
  } catch (e) {
    return dbUtil.handleDBError(e, db)
  }
}
// 查询
const query = async q => {
  let db = await dbUtil.connect()
  let collection = db.collection(collectionName)
  try {
    let result = await collection.find(q).toArray()
    return dbUtil.handleDBSuccess(result, db)
  } catch (e) {
    return dbUtil.handleDBError(e, db)
  }
}
// 删除
const dropById = async id => {
  let db = await dbUtil.connect()
  let collection = db.collection(collectionName)
  try {
    let result = await collection.deleteOne({_id: id})
    return dbUtil.handleDBSuccess(null, db)
  } catch (e) {
    return dbUtil.handleDBError(e, db)
  }
}

module.exports = {
  add,
  query,
  dropById
}