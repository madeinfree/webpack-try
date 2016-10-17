function CustomPlugin(options) {
  this.name = options.name
  this.chunkVersions = {}
}

CustomPlugin.prototype.apply = function(compiler) {
  var cp = compiler
  cp.plugin('emit', function(compilation, callback) {
    callback()  
  }.bind(this))
}
module.exports = CustomPlugin
