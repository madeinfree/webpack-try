var loaderUtils = require('loader-utils')
var customPostcss = require('../parser/custom-css-loader-parser.js')

var _compileExports = function(result, importItemMatcher, camelCaseKeys) {
  if (!Object.keys(result.exports).length) {
    return "";
  }
}

/**
 * webpack loader
 * loaderUtils.getRemainingRequest(this) // remian file
 * loaderUtils.getCurrentRequest(this) // current file
 */
module.exports = function(content, map) {
  if(this.cacheable) this.cacheable()
	var callback = this.async()

  customPostcss(content, map, {}, function(err, result) {
    if (err) return callback(err)

    var cssAsString = JSON.stringify(result.source)

    // var exportJs = _compileExports(result, undefined, undefined)

    var moduleJs = "exports.push([module.id, " + cssAsString + ", \"\"]);"

    callback(null, moduleJs)
  }.bind(this))
}
