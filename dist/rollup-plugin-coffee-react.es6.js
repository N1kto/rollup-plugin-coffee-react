import { extname } from 'path';
import { createFilter } from 'rollup-pluginutils';
import coffeScript from 'coffee-script';
import cjsxTransform from 'coffee-react-transform';

function isObject (target) {
  if (target == null) return false

  var targetType = typeof target
  return targetType === 'object' || targetType === 'function'
}

function assign (obj) {
  var sources = [], len = arguments.length - 1;
  while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

  if (!isObject(obj)) {
    throw new TypeError('Target must be Object')
  }
  sources.forEach(function (source) {
    if (isObject(source)) {
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          obj[key] = source[key]
        }
      }
    }
  })

  return obj
}

var defaultOptions = {
  extensions: ['.cjsx', '.coffee'],
  bare: true,
  sourceMap: true
}

function cjsx (options) {
  if ( options === void 0 ) options = {};

  options = assign({}, defaultOptions, options)
  var filter = createFilter(options.include, options.exclude)
  var extensions = options.extensions;

  delete options.extensions
  delete options.include
  delete options.exclude

  return {
    transform: function transform (code, id) {
      if (!filter(id)) return null
      if (extensions.indexOf(extname(id)) === -1) return null

      var coffeeCode = cjsxTransform(code)
      var compiled = coffeScript.compile(coffeeCode, options)

      return {
        code: compiled.js,
        map: options.sourceMap ? compiled.sourceMap : { mappings: '' }
      }
    }
  }
}

export default cjsx;