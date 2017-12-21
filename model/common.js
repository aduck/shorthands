const MongoClient = require('mongodb').MongoClient
const url = require('../config').DBURL

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
      return errMsg
    }
    // 校验长度 1:2
    if (rule && rule.split(':').length) {
      let min = rule.split(':')[0]
      let max = rule.split(':')[1]
      if (data[key].length > max || data[key].length < min) {
        errMsg = `字段${key}值的长度不符合规范`
        return errMsg
      }
    }
  }
}

module.exports = {
  connect,
  checkRecord,
  handleDBSuccess,
  handleDBError
}