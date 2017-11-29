const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost/test_1128'

const connect = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, (err, db) => {
      if (!err) {
        return resolve(db)
      }
      reject(err)
    })
  })
}

const insertDoc = async docs => {
  let db = await connect()
  let collection = db.collection('ideas')
  collection.insertMany(docs, (err, res) => {
    if (!err) {
      db.close()
      console.log(res)
    }
  })
}

const getDocs = async query => {
  let db = await connect()
  let collection = db.collection('ideas')
  collection.find(query)
    .toArray((err, docs) => {
      if (!err) {
        console.log({value: docs, count: docs.length})
        db.close()
      }
    })
}

const aggr = async () => {
  let db = await connect()
  let collection = db.collection('ideas')
  collection.aggregate([
    {
      $match: {by: 'higher'}
    },
    {
      $group: {
        _id: '$by',
        count: {$sum: 1}
      }
    },
    {
      $project: {
        subject: 1,
        tags: 1,
        by: 1,
        count: '$count'
      }
    }
  ], (err, docs) => {
    if (!err) {
      console.log(docs)
      db.close()
    }
  })
}

const mapReduce = async() => {
  let db = await connect()
  let collection = db.collection('ideas')
  function map () {
    emit(this.by, 1)
  }
  function reduce (k, values) {
    return 1
  }
  let col = await collection.mapReduce(map, reduce, {query: {by: 'higher'}, out: 'p_total'})
  col.find().toArray()
    .then(res => {
      console.log(JSON.stringify(res))
      db.close()
    })
    .catch(e => {
      console.log(e)
    })
}

const Idx = async () => {
  let db = await connect()
  let collection = db.collection('ideas')
  await collection.createIndex({tags: 1}, {background: true})
  collection.find({tags: '生活'}).toArray()
    .then(docs => {
      console.log(docs)
      db.close()
    })
    .catch(e => {
      console.dir(e)
    })
}

mapReduce()



// {
//   content: 'test123',
//   type: '',
//   tags: ['idea', 'todo', 'note'],
//   createAt: new Date(),
//   by: 'test',
//   status: 0,
//   summary: ''
// }
