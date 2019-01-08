
let closeFn = null
let connection = null

class ConnectionFactory {
  constructor () {
    throw Error('ConnectionFactory => This class can not be instantiated.')
  }

  static _createStores (connection) {
    ['transactions'].forEach(store => {
      if (connection.objectStoreNames.contains(store)) {
        connection.deleteObjectStore(store)
      }
      connection.createObjectStore(store, { autoIncrement: true })
    })
  }

  static closeConnection () {
    if (connection) {
      closeFn()
      connection = null
    }
  }

  static getConnection () {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open('transaction-app', 1)

      request.onupgradeneeded = event => {
        ConnectionFactory._createStores(event.target.result)
      }

      request.onsuccess = event => {
        if (!connection) {
          connection = event.target.result
          closeFn = connection.close.bind(connection)
          connection.close = () => {
            throw Error('ConnectionFactory => Invoke `ConnectionFactory.closeConnection()` to close this connection.')
          }
        }
        resolve(connection)
      }

      request.onerror = event => {
        reject(Error(event.target.error.name))
      }
    })
  }
}

export default ConnectionFactory
