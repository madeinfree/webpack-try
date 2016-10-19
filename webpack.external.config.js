module.exports = {
  entry: './src/js/c.js',
  output: {
    path: './lib',
    filename: 'external.umd.js',
    libraryTarget: 'umd',
    library: 'Tool'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  }
}
