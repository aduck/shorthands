const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost/test_1129'
const collectionName = 'shorthands'

const connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (!err) {
        resolve(db)
      } else {
        reject(err)
      }
    })
  })
}

const handleDBSuccess = (data, db) => {
  db && db.close()
  return {
    code: 0,
    message: 'success',
    data: data
  }
}

const handleDBError = (e, db) => {
  db && db.close()
  return {
    code: -1,
    message: e.message
  }
}

const checkRecord = (data, rules) => {
  let errMsg = ''
  for (let key in data) {
    let rule = rules[key]
    // 校验非空
    if (rule === 'required' && !data[key]) {
      errMsg = `字段${key}值不能为空`
      break
      return errMsg
    }
    // 校验长度 1:2
    if (rule && rule.split(':').length) {
      let min = rule.split(':')[0]
      let max = rule.split(':')[1]
      if (data[key].length > max || data[key].length < min) {
        errMsg = `字段${key}值的长度不符合规范`
        break
        return errMsg
      }
    }
  }
}
// 新增
const add = async record => {
  let db = await connect()
  let collection = db.collection(collectionName)
  try {
    // 传入数据校验
    let errMsg = checkRecord(record, {
      content: 'required',
      type: 'required',
      at: 'required',
      by: 'required'
    })
    if (errMsg) {
      throw new Error(errMsg)
    }
    await collection.insertOne(record)
    return handleDBSuccess(record, db)
  } catch (e) {
    return handleDBError(e, db)
  }
}
// 查询
const query = async q => {
  let db = await connect()
  let collection = db.collection(collectionName)
  try {
    let result = await collection.find(q).toArray()
    return handleDBSuccess(result, db)
  } catch (e) {
    return handleDBError(e, db)
  }
}
// 删除
const dropById = async id => {
  let db = await connect()
  let collection = db.collection(collectionName)
  try {
    let result = await collection.deleteOne({_id: id})
    return handleDBSuccess(null, db)
  } catch (e) {
    return handleDBError(e, db)
  }
}

module.exports = {
  add,
  query,
  dropById
}