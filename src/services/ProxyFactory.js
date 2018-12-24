
class ProxyFactory {
  static _isFunction (fn) {
    return typeof fn === 'function'
  }

  static create (model, properties, fn) {
    return new Proxy(model, {
      get (target, property, receiver) {
        if (properties.includes(property) && ProxyFactory._isFunction(target[property])) {
          return function () {
            Reflect.apply(target[property], target, arguments)
            fn(target)
          }
        }
        return Reflect.get(target, property, receiver)
      },
      set (target, property, value, receiver) {
        if (properties.includes(property)) {
          target[property] = value
          fn(target)
        }
        return Reflect.set(target, property, value, receiver)
      }
    })
  }
}

export default ProxyFactory
