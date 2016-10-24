var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin({ hot: true })
  ],
  watch: true
}
