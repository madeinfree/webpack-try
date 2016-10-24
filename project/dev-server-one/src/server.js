var sockjs = require('sockjs')
var http = require('http')
var mount = require('koa-mount');
var serve = require('koa-static');
var fs = require('fs')
var path = require('path')
var chokidar = require('chokidar')
var Koa = require('koa')

var webpack = require('webpack')
var config = require('../webpack.config.js')
var compiler = webpack(config)
var watcher;

const sockjs_opts = { sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js" }
const sockjs_echo = sockjs.createServer(sockjs_opts)

sockjs_echo.on('connection', function(conn) {
  conn.write(JSON.stringify({ type: 'connecting' }))
  
  conn.on('data', function(message) {
    conn.write(message)
  })

  conn.on('close', function() {
    conn.close()
  })

  compiler.watch({}, function(err) {
    if (err) console.log(err)
  })

  compiler.run(function(err) { if (err) console.log(err) })

  compiler.plugin('done', function(state) {
    watcher = chokidar.watch(__dirname + '/../build/bundle.js').on('change', function() {
      conn.write(JSON.stringify({ type: 'content-changed' }))
    })
  })
})

const app = new Koa()

app.use(mount('/build', serve(path.resolve(__dirname, '../build'))))
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

server.listen(1234, '0.0.0.0')
console.log(' [*] Listening on 0.0.0.0:1234')
