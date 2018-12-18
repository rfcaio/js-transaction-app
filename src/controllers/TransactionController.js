
import DateHelper from '../helpers/DateHelper'
import TransactionListModel from '../models/TransactionListModel'
import TransactionModel from '../models/TransactionModel'

class TransactionController {
  constructor () {
    let getById = document.getElementById.bind(document)

    this._dateInput = getById('date')
    this._amountInput = getById('amount')
    this._valueInput = getById('value')
    this._transactionList = new TransactionListModel()
  }

  addTransaction (event) {
    event.preventDefault()
    this._transactionList.add(new TransactionModel(
      DateHelper.stringToDate(this._dateInput.value),
      this._amountInput.value,
      this._valueInput.value
    ))
    console.log(this._transactionList)
  }
}

export default TransactionController
