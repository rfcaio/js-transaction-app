
class TransactionListModel {
  constructor (hook) {
    this._transactions = []
    this._hook = hook
  }

  get transactions () {
    return this._transactions.slice(0)
  }

  add (transaction) {
    this._transactions = [...this._transactions, transaction]
    this._hook(this)
  }

  deleteAll () {
    this._transactions = []
    this._hook(this)
  }
}

export default TransactionListModel
