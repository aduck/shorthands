const http = require('http')
const app = require('./app')

const server = http.createServer(app.callback())
let port = require('./config').PORT || 80
server.listen(port, () => {
  console.log(`服务启动，端口${port}`)
})