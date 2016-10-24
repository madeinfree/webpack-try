var sockjs = require('sockjs')
var http = require('http')
var fs = require('fs')
var path = require('path')
var chokidar = require('chokidar')
var Koa = require('koa')

const sockjs_opts = { sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js" }
const sockjs_echo = sockjs.createServer(sockjs_opts)
sockjs_echo.on('connection', function(conn) {
  conn.write(JSON.stringify({ type: 'connecting' }))
  conn.on('data', function(message) {
    conn.write(message)
  })

  chokidar.watch(__dirname + '/../index.html').on('change', function() {
    conn.write(JSON.stringify({ type: 'content-changed' }))
    conn.close()
  })
})

const app = new Koa()

app.use(async (ctx, next) => {
  try {
    const filePath = __dirname + '/../index.html'
    ctx.type = path.extname(filePath);
    ctx.body = fs.createReadStream(filePath)
  } catch (err) {
    if (err) {
      console.error(err)
    }
  }
})

const server = http.createServer(app.callback())
sockjs_echo.installHandlers(server, { prefix: '/sockjs-node' })

server.listen(9999, '0.0.0.0')
console.log(' [*] Listening on 0.0.0.0:9999')
