export const shallowClone = (obj: object) => Object.assign({}, obj)

export const deepClone = (obj: object, clone: object = {}): object => {
  for (const key of Object.keys(obj)) {
    clone[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  }

  return clone
}

export const isObject = (obj: unknown): boolean => {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj)
}
