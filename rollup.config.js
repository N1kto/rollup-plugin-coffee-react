import buble from 'rollup-plugin-buble'

const dependencies = Object.keys(require('./package.json').dependencies)

export default {
  entry: 'src/index.js',
  plugins: [ buble() ],
  external: ['path'].concat(dependencies),
  targets: [
		{ dest: 'dist/rollup-plugin-coffee-react.cjs.js', format: 'cjs' },
		{ dest: 'dist/rollup-plugin-coffee-react.es6.js', format: 'es' }
  ]
}
