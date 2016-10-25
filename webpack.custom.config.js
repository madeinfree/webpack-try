var path = require('path')
var webpack = require('webpack')

var CustomPlugin = require('./plugin/custom-plugin')

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
      },
      {
        test: /\.rdt/,
        loader: 'babel!./loader/rdt-loader.js'
      }
    ],
  },
  plugins: [
    new CustomPlugin({
      name: 'Whien'
    })
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     hot: true
    //   }
    // })
  ]
}
