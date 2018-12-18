
class TransactionListModel {
  constructor () {
    this._transactions = []
  }

  get transactions () {
    return this._transactions.slice(0)
  }

  add (transaction) {
    this._transactions = [...this._transactions, transaction]
  }
}

export default TransactionListModel
