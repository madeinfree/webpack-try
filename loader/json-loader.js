/* custom export json file */

var loaderUtils = require('loader-utils')

module.exports = function(content) {
  this.cacheable && this.cacheable()
  var query = loaderUtils.parseQuery(this.query) // { size: 20000 }
  var value = JSON.parse(content)
  return `module.exports = ${JSON.stringify(value, undefined, '\t')};`
}
