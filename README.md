# Rollup Coffee React Plugin

Basically this is a simple wrapper around [coffee-react-transform](https://github.com/jsdf/coffee-react-transform).
It enables rollup to bundle your `.cjsx` files.
It also transpiles regular `.coffee` files.

## Usage

Install it with `npm install rollup-plugin-coffee-react`

Then in your `rollup.config.js`:

```js
import coffeeReact from 'rollup-plugin-coffee-react'

export default {
  dest: 'build/app.js',
  entry: 'src/index.js',
  plugins: [
    coffeeReact({
      exclude: 'node_modules/**'
    })
  ]
}
```

## Usage with other rollup plugins
Since `coffee-script` compiles into ES5 code, you'll use this plugin in tandem with [commonjs](https://github.com/rollup/rollup-plugin-commonjs) and [node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) plugins.
Just don't forget to add `.coffee`, `.cjsx` to mentioned plugins' `extensions` option. For example:

```js
import coffeeReact from 'rollup-plugin-coffee-react'
import commonjs from 'rollup-plugin-commonjs'

export default {
  dest: 'build/app.js',
  entry: 'src/index.js',
  plugins: [
    coffeeReact({
      exclude: 'node_modules/**'
    }),
    nodeResolve({
      main: true,
      browser: true,
      extensions: [ '.js', '.coffee', '.csjx' ]
    }),
    commonjs({
      extensions: [ '.js', '.coffee', '.cjsx' ]
    })
  ]
}
```

## Options

Rollup's `include`, `exclude` plugin options are supported.
You can also pass options for `coffee-script` to configure `coffee -> js` transpiling. Please refer to [coffee-script](https://github.com/jashkenas/coffeescript) documentation for details.
