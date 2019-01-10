
import TransactionModel from '../models/TransactionModel'

class TransactionDAO {
  constructor (connection) {
    this._connection = connection
    this._store = 'transactions'
  }

  add (transaction) {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .add(transaction)

      request.onerror = event => {
        reject(Error(event.target.error))
      }

      request.onsuccess = event => {
        resolve()
      }
    })
  }

  list () {
    return new Promise((resolve, reject) => {
      let cursor = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .openCursor()
      let transactions = []

      cursor.onerror = event => {
        reject(Error(event.target.error))
      }

      cursor.onsuccess = event => {
        let pointer = event.target.result
        if (pointer) {
          let { _date, _amount, _value } = pointer.value
          transactions.push(new TransactionModel(_date, _amount, _value))
          pointer.continue()
        } else {
          resolve(transactions)
        }
      }
    })
  }

  remove () {
    return new Promise((resolve, reject) => {
      let request = this._connection
        .transaction([this._store], 'readwrite')
        .objectStore(this._store)
        .clear()

      request.onerror = event => {
        reject(Error(event.target.error))
      }

      request.onsuccess = event => {
        resolve('All transactions deleted with success.')
      }
    })
  }
}

export default TransactionDAO
