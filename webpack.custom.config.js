var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    app: ['./src/js/c.js']
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-custom.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: './loader/custom-loader.js?limit=2'
      }
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        hot: true
      }
    })
  ]
}
