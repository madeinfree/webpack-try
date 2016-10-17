var postcss = require('postcss')

var _postcssParserPlugin = postcss.plugin('css-loader-parser', function(options) {
  return function(css) {
    var exports = {}
  }
})

module.exports = function customCssLoaderParser(css, map, options, callback) {
  var pipeline = postcss([
    _postcssParserPlugin({})
  ])
  pipeline.process(css, {}).then(function(result) {
    callback(null, {
      source: result.css,
      map: result.map && result.map.toJSON(),
      importItemRegExpG: /___CSS_LOADER_IMPORT___([0-9]+)___/g,
			importItemRegExp: /___CSS_LOADER_IMPORT___([0-9]+)___/,
      urlItemRegExpG: /___CSS_LOADER_URL___([0-9]+)___/g,
			urlItemRegExp: /___CSS_LOADER_URL___([0-9]+)___/
    })
  }).catch(function(err) {
    callback(err)
  })
}
