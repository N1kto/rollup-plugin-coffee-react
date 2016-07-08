import { extname } from 'path'
import { createFilter } from 'rollup-pluginutils'
import coffeScript from 'coffee-script'
import cjsxTransform from 'coffee-react-transform'
import { assign } from './utils'

const defaultOptions = {
  extensions: ['.cjsx', '.coffee'],
  bare: true,
  sourceMap: true
}

export default function coffeeReact (options = {}) {
  options = assign({}, defaultOptions, options)
  const filter = createFilter(options.include, options.exclude)
  const { extensions } = options

  delete options.extensions
  delete options.include
  delete options.exclude

  return {
    transform (code, id) {
      if (!filter(id)) return null
      if (extensions.indexOf(extname(id)) === -1) return null

      const coffeeCode = cjsxTransform(code)
      const compiled = coffeScript.compile(coffeeCode, options)

      return {
        code: compiled.js,
        map: options.sourceMap ? compiled.sourceMap : { mappings: '' }
      }
    }
  }
}
