console.log('b.js')
/**
 * require.ensure can be dynamic require module.
 * and it can build become chunk by webpack.
 */
require.ensure([], function(require) {
  require('../../module/chunk-module-1.js')
}, 'chunk' /* chunkFilename */)
