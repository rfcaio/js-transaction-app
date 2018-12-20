
import DateHelper from '../helpers/DateHelper'
import MessageModel from '../models/MessageModel'
import MessageView from '../views/MessageView'
import TransactionListModel from '../models/TransactionListModel'
import TransactionModel from '../models/TransactionModel'
import TransactionView from '../views/TransactionView'

class TransactionController {
  constructor () {
    let getById = document.getElementById.bind(document)

    this._dateInput = getById('date')
    this._amountInput = getById('amount')
    this._valueInput = getById('value')
    this._messageModel = new MessageModel()
    this._messageView = new MessageView(getById('message-view'))
    this._transactionList = new TransactionListModel()
    this._transactionView = new TransactionView(getById('transaction-view'))

    this._transactionView.update(this._transactionList)
  }

  _restartForm () {
    this._dateInput.value = ''
    this._amountInput.value = 1
    this._valueInput.value = 0
    this._dateInput.focus()
  }

  addTransaction (event) {
    event.preventDefault()
    this._transactionList.add(new TransactionModel(
      DateHelper.stringToDate(this._dateInput.value),
      this._amountInput.value,
      this._valueInput.value
    ))
    this._transactionView.update(this._transactionList)
    this._messageModel.message = 'Transaction added with success.'
    this._messageView.update(this._messageModel)
    this._restartForm()
  }
}

export default TransactionController
