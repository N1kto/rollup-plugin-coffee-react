function isObject (target) {
  if (target == null) return false

  const targetType = typeof target
  return targetType === 'object' || targetType === 'function'
}

export function assign (obj, ...sources) {
  if (!isObject(obj)) {
    throw new TypeError('Target must be Object')
  }
  sources.forEach(source => {
    if (isObject(source)) {
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          obj[key] = source[key]
        }
      }
    }
  })

  return obj
}
