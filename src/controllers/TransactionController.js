
import Bind from '../helpers/Bind'
import DateHelper from '../helpers/DateHelper'
import MessageModel from '../models/MessageModel'
import MessageView from '../views/MessageView'
import TransactionListModel from '../models/TransactionListModel'
import TransactionModel from '../models/TransactionModel'
import TransactionService from '../services/TransactionService'
import TransactionView from '../views/TransactionView'

class TransactionController {
  constructor () {
    let getById = document.getElementById.bind(document)

    this._dateInput = getById('date')
    this._amountInput = getById('amount')
    this._valueInput = getById('value')
    this._messageModel = new Bind(new MessageModel(), new MessageView(getById('message-view')), 'message')
    this._transactionList = new Bind(new TransactionListModel(), new TransactionView(getById('transaction-view')), 'add', 'deleteAll')
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
    this._messageModel.message = 'Transaction added with success.'
    this._restartForm()
  }

  importTransactions () {
    TransactionService.import((error, transactions) => {
      if (error) {
        this._messageModel.message = error
        return
      }
      transactions.forEach(({ date, amount, value }) => {
        this._transactionList.add(new TransactionModel(DateHelper.stringToDate(date), amount, value))
      })
      this._messageModel.message = 'Transactions loaded with success.'
    })
  }

  deleteTransactions () {
    this._transactionList.deleteAll()
    this._messageModel.message = 'All transactions deleted with success.'
  }
}

export default TransactionController
