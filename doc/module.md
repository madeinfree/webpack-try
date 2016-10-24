# Module system

module 原本是 webpack 使用 method，如裹在程式碼內使用 module method，webpack 則會自動 inject module method，然後加入「被使用」的 module 中

## Module api

```javascript
module.exports = function(module) {
  if(!module.webpackPolyfill) {
    module.deprecate = function() {};
    module.paths = [];
    // module.parent = undefined by default
    module.children = [];
    module.webpackPolyfill = 1;
  }
  return module;
}
```
