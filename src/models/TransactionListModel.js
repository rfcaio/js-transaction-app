
class TransactionListModel {
  constructor () {
    this._transactions = []
  }

  get transactions () {
    return this._transactions.slice(0)
  }

  get volume () {
    return this._transactions.reduce((total, { volume }) => total + volume, 0)
  }

  add (transaction) {
    this._transactions = [...this._transactions, transaction]
  }

  deleteAll () {
    this._transactions = []
  }
}

export default TransactionListModel
