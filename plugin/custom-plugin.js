function CustomPlugin(options) {
  this.name = options.name
  this.chunkVersions = {}
}

CustomPlugin.prototype.apply = function(compiler) {
  console.log(compiler)
}
module.exports = CustomPlugin
