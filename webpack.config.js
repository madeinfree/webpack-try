var webpack = require('webpack')
var path = require('path')
var CustomPlugin = require('./plugin/custom-plugin')
var AwesomeProgressPlugin = require('./plugin/awesome-progress-plugin')

module.exports = {
  entry: {
    app: [
      './src/js/a.js',
      './src/js/b.js',
      './src/js/c.js?num=1',
      './src/js/d.js'
    ],
    vendor: [
      'react'
    ],
    loader: [
      'style-loader'
    ],
    customloader: [
      './loader/style-loader.js',
      './loader/css-loader.js',
      './loader/json-loader.js'
    ]
  },
  output: {
    path: './build',
    filename: '[name]-build.js',
    chunkFilename: '[name]-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: './loader/json-loader.js?size=20000'
      },
      {
        test: /\.css$/,
        loader: 'style!./loader/css-loader.js'
      }
    ]
  },
  plugins: [
    new CustomPlugin({
      name: 'Whien'
    }),
    new AwesomeProgressPlugin({ language: 'en_US' }, function(percentage, msg) {
      process.stdout.clearLine()
      process.stdout.cursorTo(0)
      process.stdout.write(msg)
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename:'vendor.bundle.js' }),
  ],
  node: {
    fs: 'empty'
  }
}
